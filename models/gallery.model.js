var mongoose = require('mongoose');

var GallerySchema = mongoose.Schema({
    image: String,
    video: String,
    description: String,
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    videos:{ type: Boolean, default:false},
    galleryDisabled: { type: Boolean, default:false},
    blogDisabled: { type: Boolean, default: false}
},{
    timestamps: true
});

module.exports = mongoose.model('gallery', GallerySchema);