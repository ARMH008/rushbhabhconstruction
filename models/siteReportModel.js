const mongoose = require("mongoose");

const siteInspectionSchema = new mongoose.Schema(
  {
    jmStaffEngineer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: Date,
      default: Date.now(),
    },
    time: {
      type: String,
      required: true,
    },
    clientName: {
      type: String,
      required: true,
    },
    architectName: {
      type: String,
      required: true,
    },
    siteVisitCheckingDetails: {
      type: String,
      required: true,
    },
    sitePhotos: [
      {
        type: String,
      },
    ],
    checklist: {
      propsTightAndStraight: { type: Boolean, default: false },
      defectiveMaterialsReplaced: { type: Boolean, default: false },
      formworkCleaned: { type: Boolean, default: false },
      formworkWatertight: { type: Boolean, default: false },
      columnBeamSecured: { type: Boolean, default: false },
      coverProvided: {
        columnReinforcement: { type: Boolean, default: false },
        beamBottoms: { type: Boolean, default: false },
        beamSlides: { type: Boolean, default: false },
        slabBottom: { type: Boolean, default: false },
        chajjaSlabSlides: { type: Boolean, default: false },
        isComplete: { type: Boolean, default: false }, // Add isComplete
      },
      chairsProvided: { type: Boolean, default: false },
      spacerBarsProvided: { type: Boolean, default: false },
      columnRingsProvided: { type: Boolean, default: false },
      dowelBarsProvided: {
        elevationPurdies: { type: Boolean, default: false },
        hangerColumn: { type: Boolean, default: false },
        futureBeamSlabStaircaseFlights: { type: Boolean, default: false },
        isComplete: { type: Boolean, default: false }, // Add isComplete
      },
      cubeSamplesTaken: { type: Boolean, default: false },
      noChamberInBeamSlab: { type: Boolean, default: false },
      shoringShuttingDone: { type: Boolean, default: false },
      basementHolesPermission: { type: Boolean, default: false },
      reinforcementTested: { type: Boolean, default: false },
      formworkStriking: { type: Boolean, default: false },
      slabUnderPropped: { type: Boolean, default: false },
    },
    additionalRemarks: {
      type: String,
    },
    specificNonCompliances: {
      type: String,
      required: true,
    },
    modificationPhoto: [
      {
        type: String,
      },
    ],
    clientRepresentativeName: {
      type: String,
    },
    contractorRepresentativeName: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    active: {
      default: true,
      select: false,
      type: Boolean,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Pre-save middleware to set parent properties based on sub-properties
siteInspectionSchema.pre("save", function (next) {
  const checklist = this.checklist;

  checklist.coverProvided.isComplete =
    checklist.coverProvided.columnReinforcement &&
    checklist.coverProvided.beamBottoms &&
    checklist.coverProvided.beamSlides &&
    checklist.coverProvided.slabBottom &&
    checklist.coverProvided.chajjaSlabSlides;

  checklist.dowelBarsProvided.isComplete =
    checklist.dowelBarsProvided.elevationPurdies &&
    checklist.dowelBarsProvided.hangerColumn &&
    checklist.dowelBarsProvided.futureBeamSlabStaircaseFlights;

  next();
});

siteInspectionSchema.pre(/^find/, function (next) {
  this.populate({
    path: "jmStaffEngineer",
    select: "name email",
  });
  next();
});

module.exports = mongoose.model("SiteInspection", siteInspectionSchema);
