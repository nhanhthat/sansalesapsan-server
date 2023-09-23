const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Kết nối MongoDB
mongoose.connect('mongodb+srv://dbTest:Lacdeptrai1232@cluster0.7dix2nw.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Định nghĩa mô hình dữ liệu
const LinkSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  }
});

const Link = mongoose.model('Link', LinkSchema);
let productIdCounter = 1;
// Endpoint POST để ghi dữ liệu vào MongoDB
app.post('/api/live_x', (req, res) => {
  const newLink = new Link({ content: content });
  const content = req.body.content;

  let success = false; // Biến để theo dõi trạng thái thành công

  newLink
    .save()
    .then(() => {
      success = true; // Đánh dấu thành công
      return Link.countDocuments(); // Đếm số lượng Link đã lưu
    })
    .then((count) => {
      if (success) {
        const productIdCounter = count + 1; // Tăng biến đếm ID sản phẩm
        res.status(200).json({ message: 'success', productIdCounter });
      } else {
        res.status(500).json({ message: 'Lỗi trong quá trình lưu dữ liệu' });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: 'Lỗi trong quá trình lưu dữ liệu' });
    });
});

app.listen(3000, () => {
  console.log('Server đang lắng nghe trên cổng 3000');
});