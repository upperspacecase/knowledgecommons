import mongoose from 'mongoose';

const WaterSourceSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['well', 'river', 'spring', 'rainwater', 'irrigation', 'other'],
    },
    description: String,
}, { _id: false });

const DocumentSchema = new mongoose.Schema({
    name: String,
    url: String,
    type: { type: String, enum: ['pdf', 'image', 'other'] },
}, { _id: false });

const FireHistorySchema = new mongoose.Schema({
    hasHistory: Boolean,
    description: String,
    lastFireYear: Number,
    preparednessStatus: {
        type: String,
        enum: ['prepared', 'partially', 'unprepared'],
    },
}, { _id: false });

const OpenDataSchema = new mongoose.Schema({
    weather: mongoose.Schema.Types.Mixed,
    soil: mongoose.Schema.Types.Mixed,
    satellite: mongoose.Schema.Types.Mixed,
    bioregion: mongoose.Schema.Types.Mixed,
    fireRisk: mongoose.Schema.Types.Mixed,
    elevation: mongoose.Schema.Types.Mixed,
    fetchedAt: Date,
}, { _id: false });

const PropertySchema = new mongoose.Schema({
    // Identity
    propertyName: { type: String, required: true },
    ownerName: { type: String, required: true },
    ownerEmail: String,
    editToken: { type: String, required: true, unique: true, index: true },

    // Location
    coordinates: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point',
        },
        coordinates: {
            type: [Number], // [lng, lat]
            required: true,
        },
    },
    address: String,
    boundaries: {
        type: {
            type: String,
            enum: ['Polygon'],
            default: 'Polygon',
        },
        coordinates: {
            type: [[[Number]]],
        },
    },
    approximateArea: Number,
    areaUnit: {
        type: String,
        enum: ['hectares', 'acres'],
        default: 'hectares',
    },

    // Land Characteristics
    landUse: [{
        type: String,
        enum: ['crops', 'forest', 'pasture', 'orchard', 'mixed', 'other'],
    }],
    landUseDescription: String,
    soilType: String,
    soilTestResults: [String],
    waterSources: [WaterSourceSchema],
    flora: [String],
    fauna: [String],
    floraFaunaDescription: String,

    // Risk & History
    fireHistory: FireHistorySchema,
    challenges: [{
        type: String,
        enum: ['erosion', 'drought', 'pests', 'fire_risk', 'flooding', 'invasive_species', 'other'],
    }],
    challengeDescription: String,

    // Goals
    goals: [{
        type: String,
        enum: ['conservation', 'agriculture', 'sale', 'regeneration', 'tourism', 'education', 'other'],
    }],
    goalDescription: String,

    // Documents
    documents: [DocumentSchema],

    // Aggregated open data (cached)
    openData: OpenDataSchema,

    // Meta
    locale: {
        type: String,
        enum: ['en', 'pt'],
        default: 'en',
    },
}, {
    timestamps: true,
});

// Geospatial index for location queries
PropertySchema.index({ coordinates: '2dsphere' });

export default mongoose.models.Property || mongoose.model('Property', PropertySchema);
