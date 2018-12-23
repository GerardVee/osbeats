## Open source music listening

osbeats is an open source music listening app. The app is built with React, react-sound, SCSS and Webpack.

See the site [here](http://osbeats.co).

<br>

## Use cases

Use this app to listen to music!

<br>

## Guide
- [Open source music listening](#open-source-music-listening)
- [Use cases](#use-cases)
- [Guide](#guide)
- [Develop locally](#develop-locally)
- [Deploy site](#deploy-site)
- [Configuration](#configuration)
  - [.env variables](#env-variables)
  - [API endpoints](#api-endpoints)
- [Team](#team)
  - [Hire](#hire)
  - [Members](#members)
  - [Contributing](#contributing)
- [Project information](#project-information)
  - [Built with](#built-with)
  - [License](#license)
- [Issues](#issues)
  - [Posting issues](#posting-issues)
  - [Resolving issues](#resolving-issues)
  
<br>

## Develop locally

***Note***

CSS is not hot-reloaded.

[Configure](#configuration). Run `yarn install` then run `yarn run dev`.

<br>

## Deploy site

***Note***

A `.css` and `.js` file will be put into `dist/`. Make sure your `.env` has `NODE_ENV` as `production`.

[Configure](#configuration). Run `yarn install`, then `yarn run build`. Your production files will be in `dist/`.

<br>

## Configuration

### .env variables

Save these key, value pairs to an .env file, using this syntax:

```
VARIABLE_NAME=VALUE
VARIABLE_NAME_2=VALUE
```
<br>

| variable name  | datatype  | description |
|---|---|---|
| NODE_ENV  | String  | Either `production` or `development`. |
| API | String | The full API. Include trailing `/`. |

<br><br>

### API endpoints

***Note***

Enable CORS.

<br>

| end point  | authorized | body | return type  | description |
|---|---|---|---|---|
| *GET* osbeats/search?q={ QUERY }  | No | `QUERY: String (queryParameter)` | Object  | Search a music source and return text. |

<br><br>

## Team

`osbeats` was built using various technologies, and practicing more on S3's static website hosting was fun! It was near painless this time.


### Hire

`osbeats` was remade alongside [bookshelf](https://github.com/GerardVee/bookshelf), my newest and toughest project yet. [Contact me](https://gerardvee.com/contact) if you're interested in my skills.


### Members

- [gerardvee](https://github.com/GerardVee)


### Contributing

Please post an issue if you believe you've found one. I'll get right to work on it. Additionally, you can post features under issues. Just make sure to clarify that it is a feature!

<br>

## Project information

Specifics of the project. Technologies and licensing are displayed here.

### Built with

**Base**

- [React](https://github.com/facebook/react)
- [react-sound](https://github.com/leoasis/react-sound)
- [SCSS](https://github.com/sass/sass)
- [Webpack](https://github.com/webpack/webpack)

**Supported by**

- Babel

### License

All code in this repository is provided under the [MIT License](https://github.com/GerardVee/osbeats/blob/master/LICENSE.md).

<br>

## Issues

Issues are a part of life. That doesn't mean we have to live with them though! If you encounter an issue, make sure it hasn't been [resolved](https://github.com/GerardVee/osbeats/issues?utf8=%E2%9C%93&q=is%3Aresolved) yet.


### Posting issues

New issue structure:

```
## Reproduce

How this issue can be reproduced.

## Work Around

(Potential work arounds), not necessary.

Potential Solutions

1. (Potential solution)
2. (Potential solution)
not necessary.

Extra information.
```

<br>

### Resolving issues

Issue resolved structure:

```
## What caused this

The specifics of what caused this.

## What was done

What was done to help resolve this.

## What technology was used

What extra technology if any was implemented/imported to help resolved this issue.

### Before

The code core to the issue before the change.

### After

The fixed code.

```
