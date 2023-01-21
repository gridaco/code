import { Volume } from "memfs";

const volume = Volume.fromJSON({});

// create a directory
test("mkdir", () => {
  volume.mkdirSync("/foo");

  console.log(volume);

  expect(volume.toJSON()).toMatchSnapshot();
});

// create a file
test("touch", () => {
  volume.writeFileSync("/foo/bar.txt", "hello world");

  console.log(volume);
  console.log(volume.fds[0]);
  console.log(volume.toJSON());

  expect(volume.toJSON()).toMatchSnapshot();
});

// move a file
// test("mv", () => {
//   volume.mkdirSync("/foo");
//   volume.writeFileSync("/foo/bar.txt", "hello world");
//   volume.renameSync("/foo/bar.txt", "/foo/baz.txt");

//   console.log(volume);

//   expect(volume.toJSON()).toMatchSnapshot();
// });
