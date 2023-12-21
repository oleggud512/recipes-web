const { client } = require('./../../utils/client')

class ImageRepository {
  async uploadImage(file) {
    const formData = new FormData()
    formData.append("image", file)
    const res = await client.post('image/upload', formData)
    return res.data
  }  
}

const imageRepository = new ImageRepository()

module.exports = {
  ImageRepository,
  imageRepository
}