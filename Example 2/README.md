# Express MongoDB REST API
### + Route in Express 4
### + Mongoose with async/await
### + Relationship in MongoDB Schema  (one to many)

1. #### Route in Express 4
- Thay vì:
```js
const router = express.Router();
...
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
...
module.exports = router;
```
- Có thể code như sau để  code nhìn sáng và rõ hơn:
```js
const router = express.Router();
...
router.route('/')
.get( res.render('index', { title: 'Express' });)
.post(res.render('login');)
...
module.exports = router;
```
2. Mongoose with async/await: Để tương tác với MongoDB qua Mongoose , có thể sử dụng callbacks, promise. Nhưng tốt nhất nên dùng async/await để thay thế hai cách trên.
- Xem ví dụ:
```js
newUser: async (req, res, next) => {
  try {
    const newUser = new User(req.body)
    const user = await newUser.save()
    res.status(200).json(user)
  } catch (err) {
    next(err)
  }
}
```

3. Relationship in MongoDB Schema  (one to many)
- Tham khảo link: [6 Quy tắc thiết kế schema MongoDB](https://techmaster.vn/posts/33636/hoc-lap-trinh-mongodb-truc-tuyen)

- Cách xử lý như sau khi gặp trường hợp `One to Many`:
  - Ở Schema parent:
  ```js
  cars: [{
    type: Schema.Types.ObjectId,
    ref: 'car'
  }]
  ```
  >> `Schema.Types.ObjectId` là id duy nhất được mongoose tự sync khi tạo các document<br>
  >> `car` là tên  `mongoose.model` được export và reference tới

    - Ở Schema child:
    ```js
    seller: {
      type: Schema.Types.ObjectId,
      ref:"user"
    }
    ```
>> Kết nối với parent thông qua `ref: "user"`

  - Khi đó, dùng cú pháp `populute` để show dữ liệu của document con
  ```js
    const user = await User.findById(userId).populate('cars')
  ```
  >>`cars` là tên của field trong car Schema được dùng để khai báo ref

  - Khi muốn trả về dữ liệu `cars` từ parent `user`
  ```js
    res.json(user.cars)
  ```
