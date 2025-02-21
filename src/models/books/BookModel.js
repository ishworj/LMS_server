import BookSchema from "./BookSchema.js";

export const insertBook = (bookObj) => {
  return BookSchema(bookObj).save();
};


export const changeBookDetails = (id, bookObj) => {
  return BookSchema.findByIdAndUpdate(id, bookObj, { new: true });
};

export const deleteBook = (id) => {
  return BookSchema.findByIdAndDelete(id);
};

export const fetchBooks = (filterObj) => {
  return BookSchema.find(filterObj)
};

export const fetchAllBooks = () => {
  return BookSchema.find({});
};
