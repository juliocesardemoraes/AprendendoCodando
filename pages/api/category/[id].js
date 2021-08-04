import Category from "../../../models/Category";
import dbConnect from "../../../util/mongodb";

dbConnect();

export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case "GET":
      try {
        const classObject = await Category.findById(id);

        if (!classObject) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: classObject });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "PUT":
      try {
        const classObject = await Category.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
          useFindAndModify: false,
        });
        if (!classObject) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: classObject });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "DELETE":
      try {
        const classObjectDeleted = await Category.deleteOne({ _id: id });
        if (!classObjectDeleted) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: classObjectDeleted });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
