# All The Feels

### Your group members

Ash, De'Alsha, Nickos, Shane

### Your project idea

This app will be able to submit old toys, games, candies, etc. from their childhood. Anyone who uses the app will also be able to browse other user submissions.

### Scrum manager/project manager's name

Shane

### Technologies Used

Node, Express, Mongoose, Postman

### Install And Usage

Fork and clone repository
Install dependencies

### Models

```
const Schema = mongoose.Schema;
const GallerySchema = new Schema(
	{
		title: { type: String, required: true },
		imgUrl: { type: String, required: true },
		caption: String,
		eraTime: String,
		comment: [commentSchema],
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{ timestamps: true }
)
const userSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
	},
	{
        timestamps: true,
         toJSON: {
      virtuals: true,
      // ret is the returned Mongoose document
      transform: (_doc, ret) => {
        delete ret.password;
        return ret;
    }
}
    }
);
```

### MVP Goals

User has full CRUD on Gallery model

### Stretch Goals

CRUD for Users
CRUD for Video's

### Wireframes

![MVC](https://media.git.generalassemb.ly/user/29407/files/28083f80-2e2c-11eb-8310-78a0ff7efd20)
