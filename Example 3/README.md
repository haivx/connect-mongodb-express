# MongoDB Basics<br>
## 1. Mongo
 - MongoDB là một trong những cơ sở dữ liệu mã nguồn mở NoSQL phổ biến thường được sử dụng trong Nodejs. Là cơ sở dữ liệu hướng tài liệu, nó lưu trữ dữ liệu trong document dưới dạng JSON với schema động rất linh hoạt. Nghĩa là bạn có thể lưu trữ các bản ghi mà không cần lo lắng về cấu trúc dữ liệu như số trường, kiểu của trường. 

- So sánh giữa SQL schema và mongoDB 

  | SQL        | MongoDB           | 
  | ----------   |---------| 
  | Table      | Collection | 
  | Row      | Document      | 
  | Column     | Field    |   
  | Joins   | Embeded documents, linking      | 
  | Primary key | Primary key (mặc định là _id do chính Mongo tạo)      |  

- Để start mongoDB, gõ terminal `mongod`. Sau khi MongoDB đã chạy, để vào `MongoDB Shell`, gõ lệnh `mongo`

- Các lệnh cơ bản trong MongoDB shell:
  - `show dbs`: Show tất cả DB đã có trong Database
  - `use mongobasic`: Tạo một database mới tên là mongobasic. Nếu đã có thì MongoDB sẽ truy cập tới DB đã được tạo, nếu chưa sẽ tạo DB mới.
  - `db.createCollection('toy')`: Tạo 1 collection là toy
  - `show collections`: Show collection
  - `db.toy.insert({name:'yoyo',color:'red'})`: Insert 1 document
  - `db.toy.find()`: Tìm tất cả các bản ghi có trong Collection `toy`

## 2. Mongoose:
- ORM - `Object relational management` là một thư viện giúp người dùng tương tác với database - Database driven
- Mongoose cho phép tương tác với database qua các schemas được định nghĩa.
  > Với mongo bạn có thể thoải mái add thêm các trường dữ liệu vào database mà ko phải quan tâm tới schema của Collection. 
  ```js
    db.toy.insert({name:'yoyo',color:'red', weight:'50',height:'80'})
  ```
  Với `mongoose` chúng ta có thể kiểm soát được điều đó thông qua việc định nghĩa các schemas!

- Với hệ cơ sở dữ liệu quan hệ, có 3 loại quan hệ: 1 - n, 1 - 1, n - n. Ta sẽ dùng Foreign key hoặc primary key để join bảng. Mongoose sẽ giúp làm việc đó với MongoDB
- Connect với mongoose:
  ```js
    const mongoose = require('mongoose')
    mongoose.connect('mongodb://localhost/mongobasic')
  ```
## 3. Thao tác với MongoDB qua mongoose
- Các bước thao tác với MongoDB:
  - B1: Tạo schema cho documents trong folder Models
  - B2: Xử lý database qua folder Controllers
  - B3: Điều hướng request qua folder Routes
> Collection là một tập hợp của nhiều documents, Models là đại diện cho JS sẽ sử dụng trong API để truy cập vào documents. Schemas là bản thiết kế nhằm định nghĩa ra các model.


- `Ví dụ Demo: 1 database mongobasic bao gồm 3 collection: Posts, author và categories: Tất cả thao tác trên Postman`
  - Tạo schema: Lần lượt khai báo schema cho từng collection:

```js
const categoriesModel = new Schema({
  category: String,
  post: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'posts'
  }]
})
```
> Ở khai báo schema trên cho categoriesModel ta có sử dụng relationship bằng mongoose. Categories sẽ có nhiều post tương ứng, do đó ta sẽ đặt 1 field là post có id là `objectID`. <br>

>`objectID` là `id` trong mongoDB, là unique, được mongoDB tự sinh ra khi tạo một document mới(Có thể coi như primary key trong SQL)<br>
> `ref` key cho mongoose biết `posts` thuộc  `Post` nào. 

> Khi đó ta sẽ Insert các `objectID` vào Categories thay vì insert toàn bộ `object` Categories.

- Các bước insert `objectID`: 
  - Search `Categories` chứa `post` cần thêm: 
  ```js
     //Get id of categories from Params
      const { id } = req.params
      //Get categories
      const category = await Categories.findById(id)
  ```
  - Lưu `Post` mới từ client gửi lên(req.body) vào `Schema`
  ```js
      //Create new post
      const newPost = new Post(req.body)
  ```
  >>Khi đó ở Post mới vừa lưu còn 1 trường là `categories` là rỗng vì chưa push `objectID` của Categories vào

  - Gán `objectID` đó bằng chính toàn bộ object `categories`:
  ```js
    newPost.categories = category
  ```
  >>Bây giờ Post mới đã có đầy đủ thông tin các property

  - Lưu Post vào database: 
  ```js
      //Save Post into database
      await newPost.save()
  ```
  - Đã lưu thông tin post mới xong, còn `categories` cần push các `objectID` của Post vào mảng `post`. THay vì chỉ push mỗi `objectId`, ta push cả object `newPost` vừa lưu.
  ```js
      //push categories to post's categorires: We push entitre object
      category.post.push(newPost)
  ```
  >>Bây giờ Categories đã đầy đủ thông tin các Property

  - Lưu Categories vào database:
  ```js
      //save categories
      await category.save()
  ```
  - Trả Kết quả về Client:
  ```js
      res.status(200).json(newPost)
  ```

- Link bảng sử dụng `ref` và phương thức `populate` của mongoose:
```js
    const allCategories = await Categories.findById('59ecc3ff147b260bce307d85').populate('post')
    res.json(allCategories)
```
>> Lưu ý `post` là tên thuộc tính trong `categoriesModel`. 