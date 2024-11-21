const mongoose = require("mongoose");
const multer = require("multer");
const sharp = require("sharp");
const cloudinary = require("cloudinary").v2;
const puppeteer = require("puppeteer"); // Import Puppeteer
const Site = require("./../models/siteReportModel");
const AppError = require("../utils/appErrors");
const catchAsync = require("../utils/catchAsync");
const path = require("path");
const fs = require("fs");
const os = require("os");
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Memory storage for multer
const multerStorage = multer.memoryStorage();

// Multer upload configuration
const multerFilter = (req, file, cb) => {
  // Allow only image files (e.g., jpg, jpeg, png, gif, etc.)
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images.", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

// Middleware for multiple image uploads
exports.uploadSiteImages = upload.fields([
  { name: "sitePhotos", maxCount: 5 },
  { name: "modificationPhoto", maxCount: 5 },
  { name: "clientsign", maxCount: 1 },
  { name: "employeesign", maxCount: 1 },
]);

exports.processSiteImages = catchAsync(async (req, res, next) => {
  if (!req.files) return next();

  // Function to upload images to Cloudinary
  const uploadToCloudinary = (buffer, folder) =>
    new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder },
        (error, result) => {
          if (error) return reject(new AppError("Image upload failed", 500));
          resolve(result.secure_url);
        }
      );
      uploadStream.end(buffer);
    });

  // Use sharp to process and compress images
  const processImage = async (fileBuffer, mimetype) => {
    let processedBuffer = fileBuffer;

    // If the image is not JPEG, convert it to JPEG with compression
    if (mimetype !== "image/jpeg") {
      processedBuffer = await sharp(fileBuffer)
        .resize(800) // Resize width to 800px, auto-adjust height
        .jpeg({ quality: 80 }) // Convert to JPEG with 80% quality
        .toBuffer();
    }

    return processedBuffer;
  };

  // Helper to process files in a specific field
  const processFiles = async (files, folder) => {
    return await Promise.all(
      files.map(async (file) => {
        const compressedBuffer = await processImage(file.buffer, file.mimetype);
        return await uploadToCloudinary(compressedBuffer, folder);
      })
    );
  };

  // Process site photos
  if (req.files.sitePhotos) {
    req.body.sitePhotos = await processFiles(
      req.files.sitePhotos,
      "site-inspections"
    );
  }

  // Process modification photos
  if (req.files.modificationPhoto) {
    req.body.modificationPhoto = await processFiles(
      req.files.modificationPhoto,
      "site-modifications"
    );
  }

  // Process client signature
  if (req.files.clientsign) {
    const compressedBuffer = await processImage(
      req.files.clientsign[0].buffer,
      req.files.clientsign[0].mimetype
    );
    req.body.clientsign = await uploadToCloudinary(
      compressedBuffer,
      "client-signatures"
    );
  }

  // Process employee signature
  if (req.files.employeesign) {
    const compressedBuffer = await processImage(
      req.files.employeesign[0].buffer,
      req.files.employeesign[0].mimetype
    );
    req.body.employeesign = await uploadToCloudinary(
      compressedBuffer,
      "employee-signatures"
    );
  }

  next();
});

// const multer = require("multer");
exports.getsitesinglereport = catchAsync(async (req, res, next) => {
  const doc = await Site.findById(req.params.id);
  if (!doc) {
    return next(new AppError("No doc found by that id", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      data: doc,
    },
  });
});

exports.searchreport = catchAsync(async (req, res, next) => {
  const searchQuery = req.query.name;

  // Perform a case-insensitive search for users with names containing the query
  const site = await Site.find({
    $or: [
      { architectName: { $regex: new RegExp(searchQuery, "i") } },
      { clientName: { $regex: new RegExp(searchQuery, "i") } },
    ],
  });
  res.status(200).json({
    status: "success",
    data: {
      site: site,
    },
  });
});

exports.getsitereports = catchAsync(async (req, res, next) => {
  const doc = await Site.find().sort({ createdAt: -1 });

  if (!doc) {
    return next(new AppError("no reports found", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      data: doc,
    },
  });
});

exports.createSiteReport = catchAsync(async (req, res, next) => {
  // Create the sitereport without setting the image URL
  const doc = await Site.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      data: doc,
    },
  });
});

//for employees
exports.deletereport = catchAsync(async (req, res, next) => {
  await Site.findByIdAndUpdate(req.params.id, { active: false });
  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.updatereport = catchAsync(async (req, res, next) => {
  const doc = await Site.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!doc) {
    return next(new AppError("no doc found with that id", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      data: doc,
    },
  });
});

exports.getInspectionByEmployee = catchAsync(async (req, res, next) => {
  const inspections = await Site.aggregate([
    {
      $group: {
        _id: "$jmStaffEngineer", // Group by employee ID
        inspectionCount: { $sum: 1 }, // Count inspections per employee
      },
    },
    {
      $lookup: {
        from: "users", // Replace with your User collection name if different
        localField: "_id",
        foreignField: "_id",
        as: "employee",
      },
    },
    {
      $unwind: "$employee", // Convert employee array to object
    },
    {
      $sort: { inspectionCount: -1 }, // Sort by inspection count
    },
  ]);

  // Simplify response to include only names and inspection counts
  const simplifiedResponse = inspections.map((item) => ({
    name: item.employee.name,
    inspectionCount: item.inspectionCount,
  }));

  res.status(200).json({
    status: "success",
    data: simplifiedResponse,
  });
});

exports.getInspectionTrends = catchAsync(async (req, res, next) => {
  // Get query parameters
  const year = req.query.year || new Date().getFullYear(); // Default to the current year
  const weekly = req.query.weekly === "true"; // Weekly flag: if true, group by week

  // Aggregation pipeline
  const trends = await Site.aggregate([
    {
      $match: {
        createdAt: {
          $gte: new Date(`${year}-01-01`), // Start of the specified year
          $lt: new Date(`${parseInt(year) + 1}-01-01`), // Start of the next year
        },
      },
    },
    {
      $group: {
        _id: weekly
          ? {
              year: { $year: "$createdAt" },
              week: { $week: "$createdAt" }, // Group by week if weekly flag is true
            }
          : {
              year: { $year: "$createdAt" },
              month: { $month: "$createdAt" }, // Group by month otherwise
            },
        inspectionsCount: { $sum: 1 }, // Count inspections
      },
    },
    {
      $sort: weekly
        ? { "_id.year": 1, "_id.week": 1 } // Sort by year and week
        : { "_id.year": 1, "_id.month": 1 }, // Sort by year and month
    },
  ]);

  res.status(200).json({
    status: "success",
    data: trends,
  });
});
// exports.generatePDF = catchAsync(async (req, res, next) => {
//   try {
//     // URL to generate PDF from
//     const url = "http://localhost:5173/pdf";

//     // Launch a new browser instance
//     const browser = await puppeteer.launch({
//       ignoreDefaultArgs: ["--disable-extensions"],
//       // args: ["--no-sandbox"],
//       timeout: 1130000,
//     });
//     const page = await browser.newPage();

//     // Navigate to the specified URL
//     await page.goto(url, { timeout: 1160000, waitUntil: "networkidle0" });

//     // Generate PDF
//     const pdfBuffer = await page.pdf({
//       format: "A4",
//       printBackground: true,
//       margin: {
//         top: "20px",
//         bottom: "20px",
//         left: "20px",
//         right: "20px",
//       },
//     });

//     // Close the browser
//     await browser.close();

//     // Set response headers
//     res.contentType("application/pdf");
//     res.set("Content-Disposition", "inline; filename=generated-report.pdf");

//     // Send the PDF buffer as response
//     res.send(pdfBuffer);
//   } catch (error) {
//     // Handle any errors during PDF generation
//     return next(new AppError(`PDF Generation Error: ${error.message}`, 500));
//   }
// });
// exports.generatePDF = catchAsync(async (req, res, next) => {
//   let browser = null;
//   const url = "http://localhost:5173/pdf";
//   try {
//     // Launch a new browser instance
//     browser = await puppeteer.launch({
//       headless: true,
//       args: [
//         "--no-sandbox",
//         "--disable-setuid-sandbox",
//         "--disable-gpu",
//         "--disable-dev-shm-usage",
//       ],
//       timeout: 60000,
//     });

//     const page = await browser.newPage();

//     // Set viewport to ensure proper rendering
//     await page.setViewport({ width: 1920, height: 1080 });

//     // Navigate to the specified URL
//     try {
//       // Navigate to the page
//       await page.goto(url, { waitUntil: "networkidle0" });

//       // Remove the navbar and button from the DOM
//       await page.evaluate(() => {
//         const nav = document.querySelector("nav");
//         if (nav) {
//           nav.remove(); // This removes the <nav> from the page before rendering the PDF
//         }
//         const button = document.querySelector(
//           "button[onClick='downloadPDF()']"
//         );
//         if (button) {
//           button.remove();
//         }
//       });
//     } catch (navigationError) {
//       console.error("Navigation Error:", navigationError);
//       throw new AppError(`Navigation failed: ${navigationError.message}`, 500);
//     }

//     // Generate PDF
//     // const pdfBuffer = await page.pdf({
//     //   width: "1200px", // Custom width
//     //   height: "1600px", // Custom height
//     //   printBackground: true,
//     //   preferCSSPageSize: true,
//     //   margin: {
//     //     top: "20mm",
//     //     bottom: "20mm",
//     //     left: "20mm",
//     //     right: "20mm",
//     //   },
//     //   displayHeaderFooter: false,
//     // });
//     const pdfBuffer = await page.pdf({
//       format: "A3", // or use your custom size as needed
//       printBackground: true,
//       preferCSSPageSize: true,
//       margin: {
//         top: "20mm",
//         bottom: "20mm",
//         left: "20mm",
//         right: "20mm",
//       },
//       displayHeaderFooter: false,
//     });
//     // Check if the PDF was generated correctly
//     if (pdfBuffer.length === 0) {
//       await browser.close();
//       return next(new AppError("Failed to generate PDF", 500));
//     }

//     // Save the PDF to a temporary file
//     const tempDir = path.join(__dirname, "temp");

//     // Ensure the directory exists
//     try {
//       await fs.promises.mkdir(tempDir, { recursive: true });
//     } catch (err) {
//       console.error("Error creating directory:", err);
//       return next(new AppError("Failed to create temporary directory", 500));
//     }

//     const tempFilePath = path.join(
//       tempDir,
//       `generated-report-${Date.now()}.pdf`
//     );
//     console.log("Saving PDF to:", tempFilePath); // Debugging output

//     await fs.promises.writeFile(tempFilePath, pdfBuffer);

//     // Set response headers with additional security
//     res.contentType("application/pdf");
//     res.set("Content-Disposition", "inline; filename=generated-report.pdf");
//     res.set("X-Content-Type-Options", "nosniff");

//     // Send the PDF file
//     res.sendFile(tempFilePath);

//     // Clean up the temporary file
//     // await fs.promises.unlink(tempFilePath);

//     // Close the browser
//     await browser.close();
//   } catch (error) {
//     // Ensure browser is closed even if an error occurs
//     if (browser) await browser.close();

//     console.error("PDF Generation Comprehensive Error:", {
//       message: error.message,
//       stack: error.stack,
//       url: url,
//     });

//     return next(new AppError(`PDF Generation Failed: ${error.message}`, 500));
//   }
// });

exports.generatePDF = catchAsync(async (req, res, next) => {
  let browser = null;
  const url = "http://localhost:5173/pdf"; // URL to generate the PDF from

  try {
    // Launch a new browser instance
    browser = await puppeteer.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-gpu",
        "--disable-dev-shm-usage",
      ],
      timeout: 60000,
    });

    const page = await browser.newPage();

    // Set viewport to ensure proper rendering
    await page.setViewport({ width: 1920, height: 1080 });

    // Navigate to the specified URL
    try {
      await page.goto(url, { waitUntil: "networkidle0" });

      // Remove navbar and button before generating PDF
      // Remove navbar and button before generating PDF and adjust layout
      await page.evaluate(() => {
        // Remove the navbar
        const nav = document.querySelector("nav");
        if (nav) {
          nav.remove(); // Remove the <nav> element
        }

        // Adjust the top margin/padding of the main content container
        const reportContent = document.querySelector("#report-content");
        if (reportContent) {
          reportContent.style.marginTop = "0"; // Reset top margin
          reportContent.style.paddingTop = "0"; // Reset top padding
        }

        // Remove any specific button if necessary
        const button = document.querySelector(
          "button[onClick='downloadPDF()']"
        );
        if (button) {
          button.remove();
        }
      });
    } catch (navigationError) {
      console.error("Navigation Error:", navigationError);
      throw new AppError(`Navigation failed: ${navigationError.message}`, 500);
    }

    // Generate the PDF
    const pdfBuffer = await page.pdf({
      format: "A3", // Custom page size (you can adjust as needed)
      printBackground: true,
      preferCSSPageSize: true,
      margin: {
        top: "20mm",
        bottom: "20mm",
        left: "20mm",
        right: "20mm",
      },
      displayHeaderFooter: false,
    });

    // Check if PDF was generated successfully
    if (pdfBuffer.length === 0) {
      await browser.close();
      return next(new AppError("Failed to generate PDF", 500));
    }

    // Create a temporary file path
    const tempFilePath = path.join(
      os.tmpdir(),
      `generated-report-${Date.now()}.pdf`
    );
    console.log("Saving PDF to:", tempFilePath); // Debugging output

    // Write PDF buffer to a temporary file
    await fs.promises.writeFile(tempFilePath, pdfBuffer);

    // Set response headers for the file download
    res.contentType("application/pdf");
    res.set("Content-Disposition", `attachment; filename=generated-report.pdf`);
    res.set("X-Content-Type-Options", "nosniff");

    // Send the generated PDF file as a response
    res.sendFile(tempFilePath, (err) => {
      if (err) {
        console.error("Error sending file:", err);
        return next(new AppError("Failed to send PDF file", 500));
      }

      // After sending the file, delete it from temporary storage
      fs.promises.unlink(tempFilePath).catch((deleteError) => {
        console.error("Error deleting temporary PDF file:", deleteError);
      });

      // Close the browser after sending the file
      browser.close();
    });
  } catch (error) {
    // Ensure browser is closed even if an error occurs
    if (browser) await browser.close();

    console.error("PDF Generation Comprehensive Error:", {
      message: error.message,
      stack: error.stack,
      url: url,
    });

    return next(new AppError(`PDF Generation Failed: ${error.message}`, 500));
  }
});
