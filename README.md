## To create a blog post:

Create a new file in the `_posts` folder with a name formatted like `yyyy-mm-dd-the-title-of-your-post.md`.

You can use all markdown formatting as described here: https://daringfireball.net/projects/markdown/syntax

To add images you should use `{% include img.html src="landing-image" %}`.

If you want to override the title with something more complicated, include the following at the top of your post:

```
---
title: "A Different Title: That's got some punctuation"
---
```

## To create a new entry in your portfolio:

Create a new file in the `_portfolio` folder with a same formatted like `yyyy-mm-dd-the-title-of-your-post.md`.

At the top of the file add the following:

```
---
title: "Enter your title here"

images:
  - portfolio/some-image-1
  - portfolio/some-image-2
  - portfolio/some-image-3
---
```

The first image will be used as the thumbnail. Do not include the file extension on the images.

---

## Development

* Install homebrew: https://brew.sh/
* Make sure ruby is up to date (maybe use `rvm`)
* `gem install bundler`
* `bundle install`
* `brew install yarn`
* Run `yarn` to install all the node dependencies.

To start the development server run `yarn run watch`.

To deploy your changes run `yarn run deploy`. Changes may take a few minutes to go live.
