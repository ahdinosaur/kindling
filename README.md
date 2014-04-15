# kindling

project bootstrapping with an emphasis on simplicity.

![Screenshot](https://raw.github.com/ahdinosaur/kindling/master/interface.png)

## how to

### install

```bash
[sudo] npm install -g kindling
```

## use

In order to bootstrap a project using one of the default templates you simply run `kindling` and specifiy a template and project name. For example, let's create a new browserify project called `kittycannon`:
```bash
kindling --template browserify --name kittycannon
```

---

## available templates

`kindling` comes with a few templates to get you started. While they are usable as-is, the whole point of `kindling` is make the creation of custom templates as simple as possible.

- `browserify` [browserify](https://browserify.org/) project template

## how templates work

Templates are directories with in '~/.kindling/node_modules/kindling-*' with a 'template' directory. To create a new template simply use the TODO `kindling-kindling` template and publish to npm as `kindling-{name}`. Upon use of a template, `kindling` will walk the template looking for any instances of `__somelowercasevariable__` and prompt for a value. For example, a template including this:

```javascript
/**
 * __description__
 *
 * @package __name__
 * @author __author__ <__email__>
 */
```

Will prompt:
```bash
description: Rainbow catsplosion.
author: Nyan Cat
email: kitty@meow.com
```

Which will generate:
```javascript
/**
 * Rainbow catsplosion.
 *
 * @package myAwesomeProject
 * @author Nyan Cat <kitty@meow.com>
 */
```

---

### Post Processing
By default, `kindling` will look for a `makefile` and (if found) will run `make generator` after all other template processing has been completed. This is particularly handy for dealing with template dependencies that may change over time (like git repositories or even [NPM](https://npmjs.org/) modules). For example:

```bash
generator:
    npm install

.PHONY: generator
```

Or... heck, let's go crazy nuts and automate setting up our git repo:

```bash
generator:
    git init
    git remote add origin https://github.com/__github__/__name__
    npm install

.PHONY: generator
```

---

### Testing
```bash
npm test
```

### Notes
- C, C++, and PHP often use the `__SOMETHING__` pattern for [macros](http://gcc.gnu.org/onlinedocs/gcc-3.1/cpp/Standard-Predefined-Macros.html). For this reason, `kindling` will ignore any variable instances that are specified in caps. This works fine for C and C++ users, but given that such macros in PHP are case insensitive, PHP users should keep this limitation in mind while designing templates.
- "Good coders code. Great reuse." quote shamelessly stolen from [Peteris Krumins' blog](http://www.catonmat.net/) (which you should read).
