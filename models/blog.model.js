var mongoose = require('mongoose');

var BlogSchema = mongoose.Schema({
    title: String,
    description: String,
    galleryLink: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'gallery'
    }],
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    blogDeleted: { type: Boolean, default:false},
    blogDisabled: { type: Boolean, default: false},
},{
    timestamps: true
});

module.exports = mongoose.model('blog', GallerySchema);