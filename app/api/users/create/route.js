import { connectToDB } from "@utils/database";
import User from "@models/user";

export const POST = async (request) => {
  const body = await request.json();
  try {
    await connectToDB();
    const newUser = new User(body);
    const userExist = await User.findOne({ email: body.email });
    if (userExist) {
      return new Response(
        JSON.stringify({ errorMessage: "Email is already exist" }),
        {
          status: 409,
        }
      );
    }
    await newUser.save();
    return new Response(JSON.stringify(newUser), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 500,
    });
  }
};
