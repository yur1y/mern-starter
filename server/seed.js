const {Post} = require('./models/post');
const {Comment} = require('./models/comment');

const mongoose = require("mongoose");
const config = require("config");

const content1 = `Sed ut perspiciatis unde omnis iste natus error
      sit voluptatem accusantium doloremque laudantium, totam rem aperiam,
      eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae
      vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
      aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
      qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem
      ipsum quia dolor sit amet. Lorem ipsum dolor sit amet, consectetur adipiscing elit,
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
      enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
      ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
      in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
      occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum`;

const content2 = `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
      enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
      ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
      in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
      occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum. Sed ut perspiciatis unde omnis iste natus error
      sit voluptatem accusantium doloremque laudantium, totam rem aperiam,
      eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae
      vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
      aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
      qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem
      ipsum quia dolor sit amet.`;

const data = [
    {title: 'Hello MERN', slug: 'hello-mern', content: content1, userId: '5ca23bdb2e06797bf81b61c9'},
    {title: 'Lorem Ipsum', slug: 'lorem-ipsum', content: content2, userId: '5ca23bdb2e06797bf81b61c9'}
]

async function seed() {
    await mongoose.connect(config.get("db"));

    await Post.deleteMany({});
    await Comment.deleteMany({});


    const {_id: postId} = await new Post(data[0]).save();
    await new Post(data[1]).save()

    await new Comment({text: 'Such a comment', userId: '5ca23bdb2e06797bf81b61c9', postId}).save();
    await new Comment({text: 'Such a comment 2', userId: '5ca23bdb2e06797bf81b61c9', postId}).save();


    mongoose.disconnect();

    console.info("Done!");
}

seed();
