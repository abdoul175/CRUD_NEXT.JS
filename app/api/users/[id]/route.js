import { connectToDB } from "@utils/database";
import User from "@models/user";

export const DELETE = async (request, { params }) => {
  const { id } = params;
  try {
    await connectToDB();
    const user = await User.findByIdAndDelete(id);
    const response = { user, success: "User deleted successfully" };
    return new Response(JSON.stringify(response), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 500,
    });
  }
};

export const GET = async (request, { params }) => {
  const { id } = params;
  try {
    await connectToDB();
    const user = await User.findById(id);
    if (user) {
      return new Response(JSON.stringify(user), {
        status: 200,
      });
    }
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 500,
    });
  }
};
