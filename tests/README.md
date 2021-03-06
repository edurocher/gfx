# GFX Unit and Functional Tests

This directory contains the GFX unit and functional tests.

## Setup

Before starting, install Intern by running

```
$ npm install
```

Also, if you are going to run against Sauce Labs, then
setup your SAUCE_USERNAME and SAUCE_ACCESS_KEY environment variables as they are listed
on https://saucelabs.com/appium/tutorial/3.


## Running the unit tests in a browser

To run all unit tests in a browser, navigate to:

```
http://localhost/<root>/gfx/node_modules/intern/client.html?config=tests/client
```

(where `<root>` stands for the root directory where gfx is deployed on your local web server)

You will not see the graphic output of the tests (if any), or you will see it very briefly as the page is cleared
after each test. See the next section to run unit tests as samples, with graphic output.

Note that this won't run the functional tests.


## Running a single unit test in a browser to see the graphic output

You can run a single unit test in a browser and see its graphic output. For this, navigate to:

```
http://localhost/<root>/gfx/node_modules/intern/client.html?config=tests/single&test=<test-name>
```

(where `<root>` stands for the root directory where gfx is deployed on your local web server, and `<test-name>` is the
name of a unit test, for example `shapes`).

The `gfx/tests/index.html` page contains links to run any unit test as a sample.

## Running the unit and functional tests in Sauce Labs

In the gfx directory:

```
$ grunt test:remote
```

## Running the unit and functional tests locally

1) Download selenium server (http://www.seleniumhq.org/download/) and start it on the default port (4444):

```
$ java -jar selenium-server-standalone-2.40.0.jar
```

2) Edit intern.local.js to list which browsers to test

3) In the gfx directory:

   ```
   $ grunt test:local
   ```


## Adjusting reports

Optional reports can be added via grunt flags e.g.

    $ grunt test:local:console // run the console reporter for a local test
    $ grunt test:remote:lcovhtml // run the console reporter for a remote (saucelabs) test with the lcovhtml coverage reporter
    $ grunt test:local:console:lcovhtml // multiple reporters can be specified

Currently only the reporters are provided as optional flags
   * lcovhtml
   * console





