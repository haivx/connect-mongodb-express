# connect-mongodb-express
# Demo kết nối Express và Mongoose

### Cài đặt chung
1. Cài đặt chung:
- Express: Dùng express-generator<br>

  - Nếu chưa cài express-generator thì gõ terminal lệnh:
    ```js
      npm install express-generator -g
    ```

  - Nếu đã cài thì gõ terminal lần lượt các lệnh:
    ```js
      express mydemo
      cd mydemo && npm install
      npm install
    ```
  - Vào package.json sửa phần `"start": "nodemon ./bin/www"`

  - Start server: Server sẽ start ở cổng `http://localhost:3000/`
    ```js
      npm start
    ```
- MongoDB:
  - Cài đặt mongoose:
  ```js
    npm install mongoose --save
  ```
  > Với postgres có GUI là PgAdmin, với MongoDB có thể dùng Robomongo để thao tác trực tiếp với database

- Node template: Dùng nunjucks
2. Kết nối Mongoose với Express
 Trong file `app.js` khai báo 2 thông số cơ bản:

```js
//Mongoose ODM
const mongoose = require('mongoose');

//Connect to MongoDB
mongoose.connect('mongodb://localhost/standupmeetingnotes');
```
> `standupmeetingnotes` là database được tạo

3. Cấu trúc thư mục chính: Theo mô hình MVC
- Thư mục `models`: Khai báo schema cho database
```js
const standupSchema = new Schema({
  memberName: {type: String, require: true,validate: memberNameValidator},
  project: String,
  workYesterday: String,
  workToday: String,
  impediment: String,
  createOn: {
    type: Date,
    default: Date.now
  }
})
```
- Thư mục `views`: Tạo file views để render ra browser
- Thư mục `controllers`: Xử lý data
  - Cú pháp cơ bản: `query.exec(function(error, results)) ` trong đó `query` là cú pháp query của mongoDB, `exec` là hàm thực thi kết quả trước khi trả về views
  - `query.sort({createdOn: 'desc'}).limit(12).exec(function())`: Sắp xếp data theo thứ tự giảm dần, limit 12 và thực thi(exec) function callback
  - Tạo mới một database:
  ```js
  let entry = new Standup({
    memberName: req.body.memberName,
     project: req.body.project,
     workYesterday: req.body.workYesterday,
     workToday: req.body.workToday,
     impediment: req.body.impediment
  })
  ```
    Khi lưu database, kiểm tra xem có lỗi thì trả error message:
    ```js
    entry.save(function (err) {
    if(err){
        let errMsg =  'Oop! There was an error when saving data';
        res.render('newnote',{title: 'Standup- newnote -error', message: errMsg})} else {
          console.log('The data was save on database');
            //Redirect to homepage
            res.redirect(301, '/');
        }
    });
    ```
- Thư mục `routes`: Điều hướng request
