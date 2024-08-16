import { connectToDB } from "@utils/database";
import User from "@models/user";

export const PUT = async (request, { params }) => {
  const body = await request.json();
  const { id } = params;
  try {
    await connectToDB();
    let users = await User.find({});

    users = users.filter((user) => user._id != id);

    let userExist = users.find((user) => user.email == body.email);

    if (userExist) {
      return new Response(
        JSON.stringify({ userExist, errorMessage: "Email is already exist" }),
        {
          status: 409,
        }
      );
    }

    const user = await User.findByIdAndUpdate(id, body, { new: true });
    return new Response(JSON.stringify(user), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 500,
    });
  }
};
