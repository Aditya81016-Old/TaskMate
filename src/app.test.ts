import { URL } from "./app";
const _ = require("lodash");

function getRandomUser() {
  // Generate a random name
  const firstNames = ["Alice", "Bob", "Charlie", "David", "Emma", "Frank"];
  const lastNames = ["Smith", "Jones", "Brown", "Taylor", "Wilson", "Johnson"];
  const firstName = _.sample(firstNames);
  const lastName = _.sample(lastNames);
  const fullName = `${firstName} ${lastName}`;

  // Generate a random email
  const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`;

  // Generate a random password
  const passwordLength = 8;
  const passwordChars = "abcdefghijklmnopqrstuvwxyz0123456789";
  const password = _.times(passwordLength, () => _.sample(passwordChars)).join(
    ""
  );

  return {
    _id: "",
    name: fullName,
    email: email,
    password: password,
    categories: [],
  };
}

let user, dummyUser;

it("creates new user", async () => {
  user = getRandomUser();

  await fetch(URL + "/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.data != undefined) {
        user._id = data.data._id;
        user.categories = data.data.categories;
      }

      expect(data.success).toBe(true);
      expect(data.log).toBe("New user created");
    })
    .catch((error) => console.error(error));
});

it("tries to creates a new user with used email", async () => {
  await fetch(URL + "/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.data != undefined) {
        user._id = data.data._id;
        user.categories = data.data.categories;
      }

      expect(data.success).toBe(false);
      expect(data.log).toBe("Email already exists");
    })
    .catch((error) => console.error(error));
});

it("authenticates a user using it email and password", async () => {
  await fetch(URL + `/user?email=${user.email}&password=${user.password}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      expect(data.success).toBe(true);
      expect(data.log).toBe("User authenticated");
    })
    .catch((error) => console.error(error));
});

it("tries to authenticates a user using wrong email and password", async () => {
  await fetch(
    URL + `/user?email=${user.email + "asdfsf"}&password=${user.password}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((res) => res.json())
    .then((data) => {
      expect(data.success).toBe(false);
      expect(data.log).toBe("No user found");
    })
    .catch((error) => console.error(error));
});

it("tries to authenticates a user using email and wrong password", async () => {
  await fetch(
    URL + `/user?email=${user.email}&password=${user.password + "addad"}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((res) => res.json())
    .then((data) => {
      expect(data.success).toBe(false);
      expect(data.log).toBe("User not authenticated");
    })
    .catch((error) => console.error(error));
});

it("responds with all the details of a user", async () => {
  await fetch(URL + `/user/${user._id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      expect(data.success).toBe(true);
      expect(data.log).toBe(`Details of the user sent`);
    })
    .catch((error) => console.error(error));
});

it("updates the detailes of the user", async () => {
  const password = user.password;
  const _id = user._id;
  const categories = user.categories;

  user = getRandomUser();

  user._id = _id;
  user.categories = categories;

  await fetch(URL + `/user/${user._id}?password=${password}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then((data) => {
      expect(data.success).toBe(true);
      expect(data.log).toBe("User updated");
    })
    .catch((error) => console.error(error));
});

it("tries to update the detailes of the user with wrong password", async () => {
  const _id = user._id;
  const categories = user.categories;

  dummyUser = user;
  user = getRandomUser();

  user._id = _id;
  user.categories = categories;

  await fetch(URL + `/user/${user._id}?password=${user.password}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then((data) => {
      expect(data.success).toBe(false);
      expect(data.log).toBe("Wrong Password");
    })
    .catch((error) => console.error(error));

  user = dummyUser;
});

it("tries to update the detailes of the user with existing email", async () => {
  const dummy = user.email;
  user.email = "Used@email.com"; // create a user in your database with this email address

  await fetch(URL + `/user/${user._id}?password=${user.password}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then((data) => {
      expect(data.success).toBe(false);
      expect(data.log).toBe("Email already exists");
    })
    .catch((error) => console.error(error));

  user.email = dummy;
});

it("creates a new category", async () => {
  const dummy = user.password;
  await fetch(URL + `/user/${user._id}/category`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ categoryName: "New Category" }),
  })
    .then((res) => res.json())
    .then((data) => {
      user = data.data;

      expect(data.success).toBe(true);
      expect(data.log).toBe("New category created");
    })
    .catch((error) => console.error(error));
  user.password = dummy;
});

it("responds with all the categories in user", async () => {
  await fetch(URL + `/user/${user._id}/category`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      expect(data.success).toBe(true);
      expect(data.log).toBe("Successfully fetched all the user's categories");
    })
    .catch((error) => console.error(error));
});

it("responds with all the details of a category of a user", async () => {
  await fetch(
    URL + `/user/${user._id}/category/${user.categories[1].urlName}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((res) => res.json())
    .then((data) => {
      expect(data.success).toBe(true);
      expect(data.log).toBe(
        "Successfully fetched all the data of the category"
      );
    });
});

it("renames a specified category of a specified user", async () => {
  await fetch(
    URL + `/user/${user._id}/category/${user.categories[1].urlName}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ categoryName: "Renamed Category" }),
    }
  )
    .then((res) => res.json())
    .then((data) => {
      user.categories = data.data;

      expect(data.success).toBe(true);
      expect(data.log).toBe("Successfully renamed");
    });
});

it("creates a new task in todo list of a category", async () => {
  const dummy = user.password;
  await fetch(
    URL + `/user/${user._id}/category/${user.categories[1].urlName}/todo`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        task: "New Task",
        state: "Pending",
      }),
    }
  )
    .then((res) => res.json())
    .then((data) => {
      user = data.data;
      user.password = dummy;

      expect(data.success).toBe(true);
      expect(data.log).toBe("Task added");
    });
});

it("responds with all the tasks in a category", async () => {
  await fetch(
    URL + `/user/${user._id}/category/${user.categories[1].urlName}/todo`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((res) => res.json())
    .then((data) => {
      expect(data.success).toBe(true);
      expect(data.log).toBe("All tasks fetched");
    });
});

it("responds with all the details of a task", async () => {
  await fetch(
    URL +
      `/user/${user._id}/category/${user.categories[1].urlName}/todo/${user.categories[1].todos[1].taskUrl}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((res) => res.json())
    .then((data) => {
      expect(data.success).toBe(true);
      expect(data.log).toBe("Data of the tasks fetched");
    });
});

it("updates data of a task in todo list of a category", async () => {
  const dummy = user.password;
  await fetch(
    URL +
      `/user/${user._id}/category/${user.categories[1].urlName}/todo/${user.categories[1].todos[1].taskUrl}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        task: "Task Renamed",
        state: "Ongoing",
      }),
    }
  )
    .then((res) => res.json())
    .then((data) => {
      user = data.data;
      user.password = dummy;

      expect(data.success).toBe(true);
      expect(data.log).toBe("Data of the tasks updated");
    });
});


// ! DELETE tests starts from here
it("deletes a task in todo list of a category", async () => {
  const dummy = user.password;
  await fetch(
    URL +
      `/user/${user._id}/category/${user.categories[1].urlName}/todo/${user.categories[1].todos[1].taskUrl}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((res) => res.json())
    .then((data) => {
      user = data.data;
      user.password = dummy;

      expect(data.success).toBe(true);
      expect(data.log).toBe("Task deleted");
    });
});

it("deletes the specified category of a specified user", async () => {
  await fetch(
    URL + `/user/${user._id}/category/${user.categories[1].urlName}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((res) => res.json())
    .then((data) => {
      expect(data.success).toBe(true);
      expect(data.log).toBe("Successfully deleted the category");
    });
});

it("tries to delete user with wrong name", async () => {
  const dummy = user.name;
  user.name = "a";

  await fetch(URL + `/user/${user._id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then((data) => {
      expect(data.success).toBe(false);
      expect(data.log).toBe("Wrong email or username");
    })
    .catch((error) => console.error(error));

  user.name = dummy;
});

it("tries to delete user with wrong email", async () => {
  const dummy = user.email;
  user.email = "a";

  await fetch(URL + `/user/${user._id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then((data) => {
      expect(data.success).toBe(false);
      expect(data.log).toBe("Wrong email or username");
    })
    .catch((error) => console.error(error));

  user.email = dummy;
});

it("tries to delete user with wrong password", async () => {
  const dummy = user.password;
  user.password = "a";

  await fetch(URL + `/user/${user._id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then((data) => {
      expect(data.success).toBe(false);
      expect(data.log).toBe("Wrong Password");
    })
    .catch((error) => console.error(error));

  user.password = dummy;
});

it("deletes user", async () => {
  await fetch(URL + `/user/${user._id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then((data) => {
      expect(data.success).toBe(true);
      expect(data.log).toBe(`Successfully deleted user`);
    })
    .catch((error) => console.error(error));
});
