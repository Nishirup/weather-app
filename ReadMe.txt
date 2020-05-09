Here, we will build our first NON-BLOCKING ASYNCHRONOUS node js application.
And by NON-BLOCKING , we mean that our application is going to continue to be able to do other things while it is waiting for some long running IO process to complete and thats one of the things that makes node js so great fast and efficient
First , we will explore asynchronous programming with a basic example.Then, we will take what we learn here about asynchronous programming and use it to build out our weather application.
To actually get that app built , we need to interact with real time weather API and that requires us to make asynchronous HTTP requests.
In a synchronous programming model , one line runs after the next regardless of how long each line takes to execute.
In synchronous model , we needed to wait those number of time or seconds as provided there before the program would continue 
in Asynchronous non blocking model , node can continue to do other things like run everything down below, while it is waiting for those number of seconds to pass.
With non blocking model ,  we are able to do a lot of things at the same time.For say , i can wait for 60 database requests to come back while still issuing more.

CALL STACK , CALLBACK QUEUE AND EVENT LOOP
In the last video you got started with a synchronous no to j s development and even with a simple script

like this one we ended up asking a lot of questions and not getting a lot of answers.

The goal of this video is to explore the internals of node and V eight to see how asynchronous scripts

actually execute that's going to give us answers to questions like why does this two second set time

out delay not prevent the rest of the program from running and why does a zero second delay caused this

function to run and print zero second timer after stopping prints.

Which is exactly what we're seeing down below.

So the goal is to explore the internals to get a better understanding of what exactly is happening.

I actually recommend watching this video twice.

Watch it once right now then watch it once we're done building the weather application and you have

a lot more exposure to various forms of asynchronous programming that's going to really reinforce and

reinstall exactly what's happening behind the scenes.

Now we're gonna start off with a little visualization working through how node would execute a synchronous

example.

Then we'll explore exactly how node would execute this script line by line.

I'm excited to get to that and so let's jump right in right here we have our first of three examples.

Now even very simple synchronous example like this one there is still quite a bit going on.

So let's take a quick moment to break down what we're seeing here at the top left.

We have the node file that's executing.

So this is our very simple script.

We create a couple of variables and we print a message to the screen down below.

We have the terminal output for that script.

So as these script prints something that'll show up down here on the right hand side.

We have all of the internals that are running behind the scenes in both node and v 8.

We have our call stack.

We have the node API is our callback queue and our event loop all of which work in tandem to get our

asynchronous programs running.

Now for a simple synchronous examples like this one the only of these four we need to worry about is

the call stack.

So let's take a moment to start there.

The Call Stack is a simple data structure provided by the V8 JavaScript engine.

The job of the call stack is to track the execution of our program and it does that by keeping track

of all of the functions that are currently running.

Now you've actually seen a call stack before.

If you remember in the last section we did bugged an error message that we intentionally created in

our program and we saw two things.

We saw the actual error message and below that we saw a long list of all of the functions that were

running to get to that point in the program.

That is a call stack.

Now the data structure for the call stack could not be simpler.

You can add something onto the top of the list and you can remove the top item.

That is it.

So think of it like a can of tennis balls.

Not that I've ever played tennis.

You can add a tennis ball onto the top by dropping it into the can and if you want to remove one you

have to remove the top one.

I couldn't remove one in the middle without first removing the ones above it and I couldn't add something

to the bottom of the list if there were already things inside.

So let's go ahead and see how the call stack is going to help us execute our simple program on the left

hand side.

The first thing that's going to happen is that our script.

It's gonna get wrapped in that main function that no J.S. provides in the last section when you debug

do your know J.S. applications using Chrome.

You saw that you had your application code showing up in the Chrome browser but we also saw that our

code was wrapped inside of a function that we did not create.

That function was defined by node.

And while it's an anonymous function it's often referred to as the main function for the program.

So what's the first thing that happens.

The main function gets pushed onto the call stack dropping all the way to the bottom since there's nothing

else inside.

Now when something is added onto the call stack that means it's going to get executed.

So we're gonna kick things off up here with line 1.

We create a constant.

We create a constant X with the value of one.

Then we go ahead and create the constant y the value X plus two which would be one plus two which is

three and then we move on to log the sum is followed by the sum which in this case would be some is

three.

Now log is indeed a function and remember whenever we call a function the function gets added onto the

call stack.

So right here we're going to drop a call to log onto the call stack.

So we have main and we have log.

Now once log is dropped on that's actually going to run and we are going to see our log show up.

So in the so we would get some is three printing and that's exactly what we would see if we ran the

program.

Now when a function finishes by either running to the end or returning a value it gets removed from

the call stack.

Since it's no longer executing.

So at this point the has done its job it printed something to the console.

It's now going to finish by getting removed from the call stack.

Here our little blue era would go on to the next line of the program which is actually the end of the

script which means our main function is going to finish as well that's going to get popped off the call

stack and we are left with an empty call stack at this point.

The program is done now.

This is just the first basic example to get comfortable with how the call stack is going to work.

The next example is still a synchronous example but there's a bit more complexity with multiple function

calls.

If we take a brief look at the script I can see I define a list locations function it takes in an array.

And for each location it loops through it printing it to the console down below I define the locations

and I pass them into the function let's see exactly how things would run should we run this script.

So once again the first thing that happens is the main function gets pushed on to the call stack that

allows the script to start executing right here on line 1.

We define it the list locations variable creating the function which is the variables value.

Now at this point we are not calling the function.

So it's not going to appear on the call stack.

The next thing that happens is we move on to line 7 and this is where we define our my locations array

adding a couple of locations in from there we move on to line nine and that's where we call list locations

with the array of locations.

Now this is indeed a function call.

So we're going to see list locations added on to the call stack.

It's gonna get pushed onto the stack.

Now it's the top item and I've just summarized the argument value so it all fits in this nice purple

block.

So from their list locations is actually going to start running.

That's the function that's defined here and ends down below.

Now the only thing inside of this function is a call to the for each method where looping over each

location provide it.

So for each that is indeed a function call it's also going to get added onto the call stack.

And I have dot dot dot in place of its true argument which is the function to run this function is going

to run one time for each location it gets access to the individual location and it prints it.

So that's the next thing that's going to happen in the program for each is going to be responsible for

calling this function multiple times.

And the first time it gets called it does indeed get added onto the stack.

So right here what happens.

We see that the anonymous function is called with the argument Philly and then from there we actually

call console dialog a another function.

So that gets added onto the stack as well.

Now console dot log once again is indeed going to print something.

So we'll see that appear down below.

Now console dot log is going to finish.

So that's going to get popped off these stack and once console dialogue is finished our little anonymous

function which starts here and ends here that's also going to finish since console dot log was the only

statement inside of there.

So that goes ahead and gets popped off the stack as well.

Now for each doesn't get popped off the stack because it's not quite done yet.

It still has to call the anonymous function again to make sure that New York City prints.

So we are going to see a new anonymous function added on to the call stack and then from there we're

going to see another console dot log call this time printing NYSE that's going to show up down below.

And then from there we will indeed pop off the console log call and the anonymous function call.

Now at this point for each has gone through that process two times there are only two items in the array.

So for each is done.

And that's going to get popped off the call stack as well.

Now that for each has done list of locations is also done as that's the only thing that list locations

does.

It just calls for each win for each has done the functions over.

So right here that gets popped off the stack.

Now that brings us back to where we were before online nine of the main function that is the last line

in the program which means that we are all done.

The final result we have Philly printing and then below we have NYC printing.

So here we were able to get an idea for how the call stack is going to allow us to work through our

program keeping track of the individual functions that are actually executing.

Now let's go ahead and move on to the third and final example.

This is our asynchronous example that we actually wrote out and ran in the last video and we're going

to explore how it ran behind the scenes so we can figure out why we were seeing things in the order

we were seeing.

Now for this one since it is a synchronous we will be using the call stack along with node API is the

callback queue and the event loop all working together to get our application running.

Now like with our other synchronous examples the first thing that happens is that main gets added onto

the V8 call stack that starts the execution of our program.

We start on line one with a call to log.

We've already seen what happens when we do that log it gets added onto the call stack.

Our message shows up over here and then log gets removed as the function completes.

Next up as you might have expected we move on to line 3.

That is a call to set time out set time out is clearly a function.

So something new gets pushed onto the call stack.

Now set time out is not a part of the javascript programming language.

You're not going to find its definition anywhere in the javascript spec and V8 has no implementation

for it.

Instead it is node j s which creates an implementation of set time out using C++ and provides it to

your know J.S. scripts to use as we saw it is an asynchronous way to weight a specific amount of time

and then have a function run.

So when we call set time out it's really registering an event with no J.S. API.

And that is an event callback pair where the event in this case is simply to wait two seconds and the

callback is the function to run another event callback pair might be to wait for a database request

to complete then run the callback that does something with the data.

So right here when we call set time out a new event gets registered in node API is here we have our

set time out callback and we're waiting for two seconds.

Now at this point in the process that 2 second clock starts ticking down.

Well we're waiting for those two seconds to happen.

We can actually do other stuff inside of the call stack so JavaScript itself is a single threaded programming

language.

You can do one thing at a time and the call stack enforces that we can only have one function on the

top of the call stack that is the thing we're doing.

There's no way to execute two things at the same time.

Now that doesn't mean no JSA is completely single threaded the code you run is indeed still single threaded

but node uses other threads in C++ behind the scenes to manage your events.

That's what allows us to continue running our application while we're waiting those two seconds.

We don't have to completely wait and this is the non blocking nature of note this is not blocking the

rest of the app from running.

So from here what do we do we move on to a another set time out call.

We go on to line 7 we call a set time out again.

This is going to register yet another event in the node API EIS area a callback where the event is 0

seconds.

And at that point we now have to node API is waiting in the background so we can still continue to do

other things while both of those are waiting for the event to complete in the first case two seconds

in the second case zero.

Now where do we go from here while these zero seconds are up.

So this callback needs to get executed.

Now how exactly does that happen.

Well this is where the callback queue and the event loop down below come into play.

The job of the callback queue is simple.

Its job is to maintain a list of all of the callback functions that are ready to get executed.

So when a given event is done in this case when the zero second timer is complete that callback function

the function we defined right here that's gonna get added on to the callback Q which is just a standard

line you get in at the end of the line and you work your way towards the front the front item is the

one that will get executed first.

So right here since there are no items in the list the callback gets added right up front.

So we have this callback and it's ready to get executed but before it can be executed it needs to be

added onto the call stack.

That's where functions go to run.

Now this is where the event loop comes into play the event loop looks at two things it looks at the

call stack and it looks at the callback Q If the call stack is empty it's going to run items from the

callback.

Q So at this point the event loop says I know you got added to the callback queue but the call stack

is not empty so I can't execute you.

And this is why our function doesn't run right away.

The event loop needs to wait for the call stack to be empty.

So at this point Maine actually continues to run the next thing we see is that line eleven of our program

is going to run.

That is a call to log.

So the function gets added onto the call stack our message prints.

Down below.

The function gets popped off the call stack and at this point the main function is done.

So from here main gets removed.

Now with our regular synchronous scripts this is when the program actually finished the end of Main

signified the end of the application.

That is not the case with our asynchronous programs right now the event loop can start to do its job.

It can see that the call stack is empty and it can say OK.

Do I have anything in the callback q.

I do so it takes that item and it moves it up to the call stack so the callback can run.

So at this point our callback function is running.

That is going to execute the function.

Right here there is a single line inside of there.

It is a call to luck that gets added onto the call stack.

Our message prints printing 0 seconds it gets removed and then the callback function is done.

So this is why we were seeing zero seconds after finishing up none of our asynchronous callbacks are

ever going to run before the main function is done.

So at this point in the program still isn't done.

The call stack is empty.

The callback Q is empty which means the event loop can't do anything.

The program just sits there for two seconds.

At that point our other event is done.

It's callback gets pushed onto the callback queue the event loop detects that it notices the call stack

is empty which means it's ready to run.

It takes that callback bringing it up to the call stack and it executes it.

So that is defined on line 4.

We have our call to log.

We get our message to print.

Printing 2 seconds that gets removed the callback gets removed and at this point the program is complete

the call stack is empty.

The callback Q is empty and there are no other events registered with nodes API IDs.

This means the process would be complete and over here we have the exact same output we got when we

actually ran the application.

The only difference is that we now know why we got the messages printing in the order we saw them because

node uses other threads behind the scenes for those node API as we could see why node is Nana blocking

allowing finishing up to print.

Even though we're waiting 2 seconds for our other message to print we also learned why we were seeing

finishing up print before 0 seconds.

That's because the event loop can't run any of our asynchronous callbacks until the call stack is empty

which means that main needs to finish first.

If you have any questions about what was covered here just crack open a question in the Q and A.

And remember this is not the end of our discussion on asynchronous programming.

This is just the beginning.

The goal here was to give us a mental model of what's happening now.

We're gonna dive into the rest of the section and actually explore how we can get real data from each

TTP API as into our application.

I'm excited to get to that and so let's go ahead and jump right in to the next video.

----------------------------------------------------------------------------
MAKING HTTP REQUESTS - 

In this video you're going to learn how to make HDTV requests from your no J.S. application which I'm

very excited to get to.

Why is this so important.

Because this is how your application is going to be able to communicate with the outside world.

So if you want to get real time weather data into your app you're gonna have to make an HDTV request

if you want to send an email to someone from your application that's gonna be a another H TTP request.

And if you wanted to send someone a text message using something like the Twilio API that would also

be an HDTV request.

It is at the core of building real world applications that actually communicate with the outside world.

Now with those three examples the weather data emails sending and text message sending.

It's going to be our node application making HDTV requests to another companies servers to get some

task done.

That means somewhere in our code we're gonna specify the.

You are well we want to make a request to.

This is provided via the api is documentation.

We're going to fire that request off sending some data possibly and getting a response back.

So to get weather information I would send to the location I want the weather information for I would

then get back the weather information and I could use it in whatever way I wanted to.

Now let's go ahead and explore the weather API.

We're gonna use in this video if we head over to the browser we can find this over at Dark Sky dot net.

This is Andrew from the future with a very important update.

If you head over to Dark Sky dot net you'll see this banner right up top right here.

It says that Dark Sky has joined Apple and that is indeed true.

They go into more details about the acquisition right here.

Now one of the many downsides of this acquisition is that the dark sky API is getting shut down so they're

shutting down the API.

They're shutting down the Android app and they're even shutting down the web app.

So by the time you visit dark sky dot net it's possible that this right here doesn't even show up.

You might even get redirected over to Apple dot com.

The app store or somewhere else.

So there was no notice given for this.

So one day I woke up the acquisition went through and all of the sudden the class was broken.

So I'm coming back to update the class.

We'll be switching from the dark sky API to a real time weather API provided by a service called weather

stack.

Now the good news here is that these two API eyes are pretty similar so we'll still be able to build

our real time weather application with node.

We'll just source our weather data from a different API.

Now this will require a few small changes so throughout the next several lessons I'll be coming back

in with interruptions like this one when we need to change something to work with the new API.

Now in the original lesson what we did from here is we signed up for the dark sky API that is no longer

possible.

So instead let's go ahead and sign up for the weather stack API.

We can find that by opening up a brand new tab.

And right here I'll head over to whether stack dot com.

Now like dark sky we can sign up for weather stack for free.

And there's no credit card required.

They also have a generous free tier allowing us to make a thousand requests a month.

So right here let's take a moment to sign up for the API then we'll figure out how we can get that real

time weather data.

Let's continue on by clicking sign up for free to create an account that will redirect us over to their

pricing page.

And as mentioned we'll be using their free tier where no credit card is required.

This comes with the thousand API calls a month which is more than enough for what we're building and

we get access to their real time weather data which is exactly what we're looking for.

So right here let's click sign up under the free tier option.

Then we'll just provide some basic account details starting off with our email and a password to log

in down below.

The only other information we need to provide is our address right here.

So I'll take a quick moment to provide this information.

And once we have that in place we'll be able to use the API to fetch that real time weather data.

So down below I am all done with that.

If we keep scrolling down we are at the end of the form.

We have company details which are not required so I'll leave those off.

Then all we need to do is confirm that we are not a robot and we have to agree to their terms and conditions.

Now you could choose to opt out of this right here.

But when you're signing up for an API that you're using in an application I would recommend always receiving

the notifications they sent.

If the API changes you want to get notified ahead of time so you can change your application before

things break.

If the API goes down you want to get notified so you can pass that information along to your users who

are seeing a broken application.

So it's always best to get notified about the API as you're working with.

Right here.

We should be able to sign up.

It's going through the process.

And when the sign up process is complete we are brought over to this quick start guide.

This gives us all of the information we need to fetch real time weather data.

So let's explore what we have right here.

The first thing we have right here is your API access key so your API Key is a randomly generated string

and your API Key will look different from mine.

This is kind of like a password.

You'll end up using your API key to authenticate when making requests to whether stack.

So when you're working with whether stack you have to have an account in order to fetch data.

And this API key is how weather stack links.

The request you've made with your account that's going to allow it to keep track of how many requests

you've made.

So the API access key is something we'll use in just a minute when we start to fetch real time weather

data and you should treat this like you would any other password.

So it's not something you'd want to share in a public setting.

Next up down below they list out the various API endpoints that are supported.

Now these endpoints are just different.

You are cells that allow us to access the various services that whether stack provides.

So right here we have things like their current weather data their historical weather data and other

Now as mentioned the only data we get access to on the free plan is the current weather data and that's

fine since that's all we need.

So down below they also have the base.

You are out.

It is a TTP colon forward slash forward slash API weather stack dot com.

So what I'd like to do from here is make our first request for real time weather data.

We'll end up combining this base you are all down below with other information including our API access

key up above.

So let's take our key.

I'll copy that to the clipboard.

Then we'll head over to a brand new tab and we'll make our first API request for real time weather data.

So right over here for the moment we'll make this request from a browser tab.

Once we understand how it works and we can see the data we have access to will end up making the same

request from our no J Yes application so we can use the weather data in our weather app.

For now let's just explore the basic structure.

So as mentioned we start off with H TTP colon forward slash forward slash that is API dot weather stack

dot com.

Then to access the current weather data it is a forward slash current.

Now this is a good start but we're still missing some important information we have to provide our API

key as well as the location that we're trying to fetch.

The weather for to get that done what we'll do is set up a query string right here we can set up our

query string by adding a question mark then we can set up as many key value pairs as we need to to add

things like our API key and our location.

So the format for the query string is key equals value.

If we needed to set up a second key value pair I could do so by using an ampersand followed by my second

key value pair right here.

As an example I could set name equal to Andrew.

So this is the general structure we'll be using we'll end up setting up key value pairs for our API

key and the location we're trying to fetch the weather for.

So right here let's remove everything after the question mark and the first query parameter that we

have to provide is access underscore key.

This is where we provide our API key so I'll set access key equal to the API key that we just copied

to the clipboard right here I'll paste that in after the API key.

I'll set up an ampersand allowing me to define a second key value pair.

The second one is for the location.

So right here I'll set query equal to and what we'll do is provide a latitude and longitude set of coordinates

for the location we're trying to search for.

Now later on we'll figure out how to search for something by its name like Philadelphia.

Then we'll get to the latitude and longitude so we can use it right here.

But for the moment let's just provide the coordinates for Alcatraz in San Francisco.

So right here that would be 3 7 dot 8 2 6 7.

Then we'll add a comma followed by the longitude.

That would be minus one to two dot for two three three.

So we've set up our base U.R.L. that is all of this stuff over here.

From there we set up our access key making sure that weather stack knows who we are.

Then we've set up our query allowing us to fetch the weather for that specific location.

Now once again this is our request we'll end up making from our code later on.

For now though let's hit enter and see what happens right here.

The request was made and what we're seeing is our weather data for that location.

Now in Firefox when you pull up a U R L and the response is Jason.

It uses this tool to make that response a bit easier to work with.

Well I'd like to do though is head over to the Raw Data tab.

So if we switch over to raw data this right here is the raw response.

This is Sam Jason exactly like the Jason we worked with in our notes application.

So if we had access to this in our code we know that we could take it we could pass it and we could

start to access those properties.

Now let's head back over to the Jason tab.

So right here we have our nice past weather data.

So that is it for the differences for the moment.

Now that we have this U.R.L. in place we're going to jump back in to the regular lesson.

Now in the regular lesson we'll end up making this H TTP request from our node application that's going

to allow us to access the weather data in our app.

Now there will be a couple of other changes throughout the lesson so I'll jump back in with a couple

of other interruptions as those come up.

For now though let's jump back in to the regular lesson let's go ahead and move into visual studio code

and actually make the same request we're making here.

But from our application to start I'm going to delete everything in app dot and J S we have our little

set time out example and that helped us illustrate how asynchronous programming works.

But now it's time to move on to some more real world stuff.

Now to make a TTP requests there are a few different things we can do.

We can use the core node modules which we will cover a little bit later but those are very low level.

So it requires you to write a lot of unnecessary code to get everything working together.

There are a bunch of NPM modules that are essentially wrappers around that core module making it much

easier and more streamlined to make HDTV requests.

And that's what we're going to use throughout the course.

Although as mentioned we will explore how to do it the bare bones way shortly.

For now we're gonna use a single NPM module to make our HDTV requests and appropriately enough it is

called request.

You can find it by googling NPM request that is going to hopefully bring you to the package page right

here it is NPM J Ask.com forward slash package forward slash request.

We can visit that page to learn a bit more about what it's going to do for us and this like the other

packages we've used is super popular with about six million weekly downloads.

Now if we scroll down we can see all sorts of different examples as to how this can be used.

We're going to explore more advanced features like promises and async await a little later.

For now we're gonna get started with a nice simple example.

Let's go ahead and actually install this into our project so we can make a request from our node application

over inside of the terminal.

We first need to initialize weather app as an NPM project.

If you remember we got that done by running NPM in it from the root of the project.

So in this case from the weather app folder.

Now when we ran that command we got brought to a questionnaire asking us to fill out a ton of values.

And if you remember we used the default value for all of them.

So what I'm going to do is actually use control C to shut that down.

So I've done nothing.

Then I'm going to use NPM in it again with the Y Aflac.

This just says answer yes to every single question using the default value.

So we don't have to go through that little questionnaire when we do this it automatically generates

the package.

Dot Jason file with all of the default values in place.

We can now customize them to fit our needs.

And now we can run npm install commands to install the modules we need from the terminal.

Let's go ahead and do just that.

I'm gonna use NPM AI which is short for install to install the request module at the latest version

two point eighty eight point zero.

Now I'm not using the G global flag since this is a module I want to require and use inside of my scripts.

So let's go ahead and get that done.

I'm gonna run the command that is going to install the request module then we're going to move over

to app dot J asked to load it in and use it.

So inside of that j s Let's go ahead and start by requiring request.

I'm gonna make a constant called request and I'm going to require the module we just installed which

was indeed a request.

And this is actually going to work because we installed the module.

We have package.

Jason we have package lock down.

Jason and in the node modules directory we have all of the necessary modules to get request to work.

So we have request itself as well as all of its dependencies showing up inside of there.

Now that we have this in place let's go ahead and use it.

We need to work with that same you are well we just explored in the browser where we got the Jason data

back over in the browser.

I'm going to visit that tab where we were getting the Jason response and I'm going to grab the U.R.L..

This is the U are L that contains our secret key as well as that random set of coordinates which we

will learn how to change later.

So instead of visiting the are all in the browser and seeing the data here we're going to visit it via

the request module and we'll get that data back as a variable we can access in our code.

So right here let's start by storing the U.R.L..

I'm going to create a concept you are all whose value will be a string and I am going to paste the entire

contents of that you are all right here.

This is Andrew with another quick update.

Make sure you use the weather stack you are all that we just explored earlier.

So take the entire U.R.L. copy that to the clipboard and use that as the value for the U.R.L. variable.

You won't be using the dark sky you are all like I do in the lesson.

Instead you'll be using your weather stack you are all we're not going to change anything for the moment.

We're just going to make their request so we get this exact same data back.

But in our note app now from here we can actually use request which is a function to make the request.

We are going to call it providing to it to arguments.

The first is an options object which outlines what we'd like to do.

That's where we provide the U.R.L. and other information.

The second argument is a function to run once we actually have that response.

So once the data is available for you to use in your application let's start with that first argument.

That is the options object right here.

We're going to set that up.

And as mentioned there is a single required property which is U.R.L. we have to provide the U.R.L. value.

We want to use and I have that in a variable with the same name.

That's all for the first argument.

The second argument after that object is going to be a function.

This is the function to run when we're actually getting the response back.

So right here I'm going to set up that callback function and this function will run when either one

we have the weather data or two.

Something went wrong and we weren't able to get the weather data.

So maybe as an example your machine doesn't have a network connection maybe you're not connected to

the Internet in that case.

This request would indeed fail.

Now this function gets called with two arguments it gets called with an error.

If there was one otherwise this argument will be undefined and it gets called with the response where

we can actually access the response.

This includes all sorts of information.

And it does include the Jason response we need.

Now if you're not familiar with the ins and outs of each TTP request that's OK we're actually going

to dissect them in detail in just a couple of videos for now.

Let's go ahead and try to use the response in our program to get started.

Let's go ahead and just dump the response object to the console.

So console dialogue response.

This is going to contain everything about the response way more information than just that Jason data.

I'm going to run the program from the terminal down below.

I will use clear to clear the terminal output then node app dot J asked to run our script now what's

going to happen is a ton of information is going to get dumped to the terminal we can see there are

hundreds of lines of information response has a lot of properties we can use and those properties have

other properties and so on and so on.

Now if we start to scroll up we can see we have one really long string shown in green.

This is actually the string Jason data that we want to pass and access.

If we scroll up to the top of that string this is on the body property.

Now there are plenty of other properties for getting the response headers or the status code or that

you are L or any other information you would want about their request.

We'll explore those a bit later when we dissect HDTV requests.

For now let's just focus on that one property the body property which contains our data represented

as a Jason string.

Now we already worked with Jason so we know how to pass a Jason string right here.

I'm going to create a concept called data and I'm going to set it equal to we'll be using Jason dot

pass to pass our data and the data lives on response dot body.

Now we're gonna go ahead and actually work with that data.

I'm going to log the data object to the screen right here we have asked J in its modified state.

Let's go ahead and rerun the program.

I can just use the backspace key to bring me back to the terminal down below and from here we're going

to rerun the script with our passing code in place.

So I'm going to run node apt out J.

S. This time we're still going to see a lot of stuff print but a lot less.

Now if we scroll up we're going to see an endless amount of information.

For example we have all of these objects.

I see properties related to wind speed and wind gusts.

I have temperature min and max for the day.

All sorts of useful forecast information and we'll explore more of this in the next video for now to

wrap up I just want to access a single property that is the currently property so data dot currently.

This is Andrew with one last update for the lesson with the dark sky API.

It was data dot currently with the weather stack API as shown below.

It is data dot current.

So make sure to use that property in a couple of moments I'll talk about properties on the old response

that don't exist on weather stack but don't worry we'll start to talk about the differences in data

in the next lesson this contains current forecast information.

And if we rerun the program this time we're gonna see a lot less output.

We have what maybe 20 lines.

We have a summary.

So wherever this location is it is indeed clear.

And I have information about things like the temperature it is currently fifty four point two degrees.

I have things about the humidity pressure wind speed all current weather information for that location.

So now that we have this in place we have indeed accessed our first HDTV API from node j s allowing

us to pull in outside information into our applications.

I'm excited to continue exploring HDTV requests asynchronous node and the weather API in the next video.

So let's go ahead and jump right in.

-------------------------------------------------------------------------
CUSTOMIZING HTTP REQUESTS

In this video we're going to continue to explore our request.

We're going to learn how a request can automatically pass the Jason for us.

We're also going to figure out how we can actually print a forecast using the response data.

And finally we're going to explore some options for the dark sky API allowing us to do things like change

the language from something like English to French and change the units from something like Imperial

over to as I say you could get the temperature back in Celsius as opposed to Fahrenheit.

Let's get started by having the request module automatically pass the Jason response for us.

We can do this by customizing the options object and there is a list of all available options over in

the documentation.

So if I head back over to the request module page and scroll down to the table of contents way near

the bottom we have all available options.

If we click this this is going to list out all of the options we can use.

Now up top we already have the you are Al option which we've already used.

If we scroll down the list a little ways we're going to see a Jason option.

Jason in lower case can get set to equal True or false in our case we're going to set Jason to true

which is going to have the request module automatically pass.

Jason responses for us.

So over inside of our code what do we need to do.

We're going to add a second property onto this object.

So right here alongside of you are L we'll set up Jason in lower case.

This is important.

If you use uppercase it's not gonna work.

Then we're going to set it equal to the Boolean true saying we would like a request to pass this as

Jason.

Now from here that means response.

That body is already going to be an object.

There is no need to actually pass it.

So let's go ahead and change what we're doing inside of our function.

Right here I am going to use console dialog to print the same stuff using our new setup.

That would be first up response response dot body still exists though since we've set Jason to true

is no longer a string.

It is now the past object from there we're going to access currently which is what we were already accessing

and dumping.

That's what we're seeing down below.

This is Andrew with another interruption as I mentioned in the last lesson of the current weather data

for Dark Sky was on currently.

But the current weather data for weather stack is on current.

So if you're using the weather stack API you would want to access response dot body dot current as shown

below.

Now we can save app dot and J.

S I can rerun the program and what do we get.

We get the exact same response.

I have my object showing up with my current information it's still clear and the temperature has increased

a little bit to fifty seven point five five degrees.

So now that request is passing the Jason for us we don't have to manually add that code every single

time we're trying to make an H TTP request from node j as a firm here.

I want to focus on printing a forecast to the user.

Now that means we have to figure out what data to include and what to leave off and that can be tricky

to do when you're looking at a dump of your data from the terminal.

I find it much easier to use the browser to explore what data I want to include from a Jason response.

Now currently the information we're seeing is very hard to pass since it is just a Jason string.

There are chrome extensions out there though that allow you to see nice past formatted data.

There are extensions for other browsers as well like Chrome Firefox and Internet Explorer.

So what I'm going to do is search chrome extension and the one we're going to use is called Jason for

matter though there are literally dozens of different options out there.

Right here I have the chrome extension and all I'm going to do is install it.

I'll take a quick moment to add it to Chrome and once we have it installed successfully we can go ahead

and move back to that page refresh things.

And this time the chrome extension is going to notice that Jason has been returned and it's going to

pass it for us.

Now over here with this particular extension I can also view the raw data should I want to.

But the whole goal is to view the past data.

Now we can collapse the various properties easily navigating what we have here.

So we have this root object.

It starts up here on line 1 and it gets closed way way down below at the very end of this object.

So way down here on the last line everything inside of there is part of that object.

Now this object is accessible to us as body.

So an IMAX guessing response dot body I am accessing this object from there I can grab any of its properties

like currently.

Which is the fourth one listed that's why response dot body dot currently works.

I could also use response dot body dot time zone as shown here to get the time zone for the current

location.

So now we have a slightly better idea as to how we're accessing this information below.

Currently we have a minute early so we can get a minute by minute forecast.

If I was to collapse that we have hourly below that we have daily and below that we have some flags

and we also have the offset which are not particularly useful for our purposes.

Now what are we trying to do here.

Well currently we're just going to use the currently property that we do have other forecast information

we could use to get even more data which we'll explore a little later.

So for now we're just going to focus on this object and all of the properties are values we can use.

Let's go ahead and talk about exactly what type of forecast we'd like to print down below.

I have some challenged comments.

It's going to be up to you to use the information on currently to print a little message using that

actual information.

So in general the goal is to print something like this.

It is currently fifty eight point five five degrees out there is a zero percent chance of rain.

Now this piece of information the current temperature and this piece of information the chance of precipitation.

They're both available on that currently object.

I have a temperature property.

This is where I get the temperature from and I also have properties related to precipitation.

Right here I have pre sip probability currently at zero.

This is Andrew from the future with another quick interruption.

So with the weather stock API we have access to a different set of weather data.

So let's talk about what's going to need to change and we'll get started by exploring the root properties

we have on our Jason response.

So right here there are three.

We get started with the request property which contains information about the request that weather stack

processed.

We have the latitude and longitude.

We also have the language and the units.

We're not going to use any of that data.

So let's collapse it.

Next up we have information about the location that we're viewing the weather data for.

Right here.

I can see this is for North Beach California.

Let's collapse location as well.

That leaves the last property of the third one which is current current contains the current weather

data.

And this is the property that you'll need to work with for the challenge.

Now if we head over to visual studio code I've made some changes to what you're supposed to do.

So this right here should be exactly what you have.

I have my weather stack U.R.L. setup and I'm accessing response dot body dot current.

All I've done is changed the challenge comments down below.

So what you'll end up doing is printing something like the following it is currently 9 degrees out.

It feels like five degrees out.

So here we are using the temperature and the apparent temperature the feels like temperature for when

we account for things like wind and humidity.

So you can access both of the temperature and the feels like temperature on that current property.

So right over here we have current you can access the temperature on temperature right here and you

can access the apparent temperature on fields like which we have down below.

So for this forecast I can see the temperature is 10.

Well the feels like is eight.

So there must be some windchill factoring into the difference.

So this is what you'll end up working with you'll end up printing something like this using the weather

stack API.

OK that is it for the update.

Let's jump back into the original lesson so using these two pieces of information we want to generate

the following forecast.

That means you're going to comment out this line or remove it and add another council dot log call in

to print your forecast.

From there you're going to test your work.

So you want to run the script and make sure you're seeing your string with the correct values added

inside.

Take as much time as you need to generate this string using those two pieces of dynamic information.

And when you're done come back and click play and we'll work through it together

how that go.

Let's get things started by working with our message.

So I'm going to use console dot log to print something and that something is the string right here with

those two dynamic values included.

So we start off with some static text I'll create that in a string.

It is currently followed by a space.

Then we're going to concatenate on the actual temperature.

So like we did before.

That's going to be response dot body dot currently.

That's going to bring us to this object right here.

And on that object we have the temperature property which is the one we're looking for.

So dot temperature excellent.

Now after the temperature we go back to some static text so I'll concatenate on another string and we

will start with a space the space between the temperature and the D in degrees.

Now I'll start typing out degrees out period followed by the start of the next sentence.

There is a space and in here we have to insert the.

Percent chance of rain.

So once again I'm going to concatenate on a value that will be a response dot body dot currently dot.

And right here we are looking for preset probability.

So precision using these shorthand for the word probability.

And finally we can concatenate on the closing static text so after our probability it's percent chance

of rain.

So right here a percent chance of rain.

Excellent.

Now we have this really long string created and we can go ahead and actually test our work I'm back

with another quick interruption.

If you're working with the weather stack API let's go over the console log call for that.

So we start off with it's currently the string followed by the current temperature right here.

You should have access that firm response dot body dot current dot temperature after the current temperature.

We move on to more static text right here.

I have degrees out which finishes up the first sentence from there we start our second sentence with

it feels like and then we get the apparent temperature on a response dotted body dot current dot feels

like from there we wrap up the second sentence with degrees out in eight period.

So this is the solution you should have come up with.

If you were working with the weather stack API now we can test our work down below by just rerunning

app dot J.S. so I'll use node space app dot J.S. and if I run things I would expect to get the correct

result right here.

I get it is currently 10 degrees out.

It feels like seven degrees out which is fantastic.

With that change made let's head back into the regular video so I'm going to rerun the program from

the terminal down below to start I'll use clear to clear the current output then node space act J asked

to rerun the program and what do I get I get it is currently fifty eight point two two degrees out there

is a zero percent chance of rain which is fantastic we were able to make an H TTP request for data parts

that data into a format that was usable and actually use it inside of our node J.S. application in a

meaningful way or this update what we'll end up doing is figuring out how we can change the units for

the data that comes back.

So right now we're seeing the temperature in Celsius but if we want to we could request that temperature

from weather stack in Kelvin or Fahrenheit.

Now in the original lesson what we did is we explored the dark sky API to figure out how to get that

done.

Then we changed our U.R.L. and we watched the data change in the response we'll end up doing that exact

same thing for weather stack.

So first up let's check out the documentation so we can figure out how to get this done.

I'll switch over to the browser I'll switch over to the quick start guide we explored earlier.

Then I'll scroll to the top and right here we can head over to whether stacks documentation.

So I'll head over to the documentation page and right here we can learn all the different ways we can

work with the weather stack API.

Now what we're looking for can be found in the left hand side bar so down below we have getting started.

We have API features and we have options under options.

We are looking for the units parameter.

So for our particular U.R.L. you'll remember that we set up our API key and we also set up our query

what we'll do here is set up something else.

We will set up units so I'll click on units parameter that will bring me down to the documentation.

And right here I can see that I can set units equal to one of the following values if I set units equal

to m.

I'll see my data using the metric system.

Now this is the default option.

So we're already seeing our temperature in Celsius.

If I switch the value over to S for scientific I would see my temperature in Kelvin.

And finally if I switched units over to F for Fahrenheit I could view the temperature in Fahrenheit.

So right here let's explore how we can get that done.

And since I live in the States I'll be switching things over to Fahrenheit so I'll head back over to

visual studio code and what we'll end up doing is adding another query parameter.

So right here I have my first one access key.

If I scroll over I have my second one query will add a third one so right at the end I'll use an ampersand.

Then we can set up a another key value pair.

So right here I'll go ahead and use the key of units followed by the value.

So units equals right here.

I'll use f once again you can use m intensity the temperature in Celsius s to see it in Kelvin or F

to see it in Fahrenheit.

So with units set up let's say you've asked J.S. down below.

All I'm going to do is rerun the program so I'll run apt J ask through node once again and if I do right

here I can see my data looks pretty different.

Right here I am seeing my temperatures and Fahrenheit.

It's currently 45 degrees and it feels like 41.

So now we know how we can customize the units that are coming back from our API.

Now at this point in the original lesson we had added just one additional piece of information to our

weather forecast and that was it for the lesson.

So we added that additional piece of information as the very first thing we render.

So to explore what will end up adding let's head back over to our API request in the browser so I'll

switch back over to the browser.

I'll head over to our API response and right here what we'll end up doing is starting things off with

a general description of the weather.

Now we could collapse at the request property.

We could also collapse the location property right here that just leaves us with current and what will

end up doing is printing the weather description.

So right here that would be overcast and that will show up first.

Now it will always be overcast sometimes it will be sunny or partly cloudy whatever it is.

That's what we'd like to show up so we can access that data on current.

Then from there we would access it on the weather descriptions array.

What we'll do is pull in the first weather description and render that as part of our forecast.

We can get that done by heading over to app J.S. and adding that as the very first thing in console

dialogue.

So right here that would be response dot body from here we will pull something off of the current property

right here as we just explored.

That was Dot whether underscore descriptions.

Now remember that is an array of strings.

So I'll use bracket notation to grab the first item by its index.

That would be an index of 0.

Next up right after that what I'll do is use the plus operator to concatenate the rest of my string

onto the end.

Now in this case if we used the current data what we would see right here is the word overcast followed

directly by it.

There wouldn't even be a space in between what I'll end up doing is starting this string off with a

period end of space.

So this data looks like it's in its own sentence now that we have that in place.

We can save things and test our work now in the original video.

We added something similar though it came from a different property.

So when you do watch the original video you'll see something different right here.

But this is what we need for the weather stack API.

So down below let's just rerun our program once again.

And if I do right here we can see exactly what we had before.

Now it looks like in the last couple of minutes the weather did indeed change.

So right here I see partly cloudy followed by It is currently 45 degrees out.

It feels like 41 degrees out.

So this is awesome.

We now have a summary of the weather.

Then we have the actual temperature followed by the apparent temperature when we factor in humidity

and wind.

So in the original video that's where we had stopped for this one.

What we'll end up doing is moving on to the next lesson where it will be up to you to work with a completely

different API.

Now the good news is that when it comes to these big updates because of the API change we're basically

done.

There's a couple of small updates throughout the next several lessons but there's actually nothing that

needs to change in the next one.

It was really just the last one and this one that required some more substantial changes now that we

have that code in place though we are good to go.

So let's jump right into the next one which is a challenge for you to fetch data from a new API.

-------------------------------------------------------------------------
HTTP REQUEST CHALLENGE
nce

we have one we can integrate what we know about geo coding into the weather app.

Let's go ahead and create the account so I'm going to pick a user name then I'll provide my email address

as well as pick a password for the account and everything else is completely optional.

You don't need to provide your name or your company information then we're going to click a getting

started and this is going to bring us over to the map box dashboard from here.

The first thing we want to do is head over to the access tokens tab up top.

This is going to bring us to our access token and this is what we're gonna need to provide with our

request.

So in that box knows we're actually authenticated and it can associate the request with our account

now up above it talks about why we would need an access token.

And it links to map box Web services.

These are all of the HDTV requests you can make with the map box tool set and we're going to crack open

that link in a brand new tab.

This is Andrew from the future with a quick update as you'll notice the API docs you're seeing are different

from the API docs I'm seeing in the video map box reorganized their API docs changing the layout.

Now the new docs are indeed better but they're different which means it was impossible to follow along

with the old video.

So what I'm doing here is refilling the next five or so minutes where we explore how we'll be using

Matt box.

Once we're done with that we'll get back into the regular video the actual end points and what data

we get back.

That hasn't changed at all.

It's just the API docs that have been redesigned and reorganized.

So let's get to it.

Here are the new API docs and this should be similar to what you're seeing now there are a lot of different

features documented here.

What we're looking for is in the sidebar under search service if we click on that.

This brings us over to their geo coding service.

That's what's going to allow us to take addresses like this one and convert them into coordinate pairs

once we've converted the address into the coordinate pair we can pass the latitude and longitude off

to Dark Sky to actually fetch the weather we can see right here that this API supports two different

types of geo coding.

We have a forward geo coding and reverse geo coding we want forward geo coding that's when we provide

an address and get back the latitude and longitude and reverse geo coding just does the opposite in

this case though we have the address we want the coordinate pair.

So we'll use forward geo coding.

Now if we scroll down onto this page we get to the End Points section and if we keep going past that

eventually we get to forward geo coding.

And this is the end point we're going to be using we'll provide our address.

We'll get back the latitude and longitude.

Now down below we can see there are two required parameters.

One is the end point we're gonna use map box dot places.

This is the main one.

The other one is reserved for enterprise customers.

And we also have these search text.

This is where we provide the address down below the required parameters.

We can see there are a bunch of optional ones which also allow us to customize that operation and we'll

explore a couple of these in just a few minutes.

If we keep scrolling down though the next thing we run into is example request with forward geo coding.

Now right here they're just using the curl command from the terminal to fetch the given end point.

But let's examine the end point and then we'll see what data we get back.

So it starts off with the base U.R.L. That is h TTP s API map box dot com.

Then we have this portion of the U.R.L. right here.

We are using their geo coding API it is Version 5.

Then we provide those two required parameters.

As mentioned we have map box dot places and then we have our search term right here.

The example request is searching for Los Angeles.

So what we get back would be the coordinate pair for that location.

Next up we have a bunch of other information we have dot Jason.

So we're gonna get Jason data back.

And here we start the query string.

Now we have key value pairs inside of here.

And by default there is only one it is access token.

This is where we provide the API token for our account and we can see that it's already set up in the

U.R.L. right here.

And it runs on quite a bit.

So what we're going to do is take this U.R.L. bring it over to the browser and explore the response

data.

Once we're comfortable with it we'll customize it with a few of those optional parameters and then we'll

actually integrate this into our project code.

So right here let's take the entire U.R.L. without those double quotes.

I'm going to copy it to the clipboard and once I have it we're just going to crack open a new browser

tab and visit that you are all when we do.

What do we get.

As expected we get a Jason response.

Let's explore the Jason response and to start I'm going to collapse the expanded properties query and

features.

And right here we can see that the root of our response is just an object with four properties type

query features and attribution.

Now query just lets us know what we provided.

So right here we have these search terms that we provided via the U.R.L. up above.

It is the features array that contains the interesting data we want to extract.

Now you'll notice it's an array five items.

So by default that box is going to return the five most relevant search results for your search term

and the most relevant one comes first.

So Los Angeles in California is not the only Los Angeles out there.

It happens to be the first result since it's the most relevant.

But there are other cities with the same name.

So let's dive into the features array and see exactly what we got right here.

The first object in the features array is what we're going to focus on.

It starts up above and it ends way down here.

And this is the most relevant search result for our keywords right here we can see there are a lot of

properties one that's interesting is place name.

Los Angeles California United States.

So right here this is something we can display to the user so they know exactly where they're getting

the weather for and if they see this and it's not the Los Angeles they expected they can always change

their search term to target a different city with the same name.

Now aside from place name we also need the latitude and longitude and those are available via the center

property.

It is an array with two numbers inside the first number that is the longitude and the second number.

That is the latitude.

So we're going to be able to extract these two values from the Jason response and pass those off to

the dark sky API to fetch the weather for this location before we go any further.

Let's head back over to the API docs and explore some of the optional parameters.

So right here we have a nice list of optional ones one that might be of interest to us is language.

Language allows us to customize the language that's being used in the response.

So right here if I was creating an application specifically for German users or specifically for French

users I could customize the response with language to get things back in their native tongue.

Now down below language we have other options as well.

One being limit limit allows us to specify the maximum number of results we can return.

Now by default it's five.

We've seen that.

And the maximum supported is 10.

In our case we know that we're only ever going to use the first result.

That's what we're going to fetch.

The weather for.

So we can actually set the limit to one requiring less data to be sent back.

Speeding up the request.

So let's get that done.

We're going to use limit in our U.R.L. over here.

Now that you are l already sets up our query string it starts with the question mark and we provide

our first key value pair.

The key is access token then it's equals followed by this really long value at the end of that token.

We're going to set up a another key value pair for the query string.

We use the ampersand followed by the key that is limit followed by equals.

Then the value and right here we'll just limit it to one search result.

Let me bring that back up just so you can see it there is exactly what we're using now in this case.

If I refresh the page I can see that the features array is still an array.

It's just an array of one item.

So right here we have the most relevant result.

Once again it is Los Angeles in California.

If someone wanted to target a different Los Angeles they could add more content to the search term to

be more specific.

Now that we have this in place let's continue on with the regular programming as we're done exploring

the changes made to the API documentation.

Thanks for bearing with me.

Let's get to it now.

Let's talk about what I'd like you to do as your challenge for the video.

The goal for now is to not worry about integrating the two requests together we'll get to that shortly.

The goal for the moment is to just create a completely separate request.

Getting this you are well integrated into our application.

So right here what you do is not going to tie in with what we have above in any way whatsoever.

And that is the point.

For now the goal is to print the latitude and longitude for Los Angeles which is indeed the search term

we've used in the you are all we have in the browser.

So step one you're going to fire off a new request to the U.R.L. we explored in the browser and you're

going to have the request module pass it as Jason like we did above.

From there you're going to print both the latitude and longitude to the terminal and you're going to

use the two values on the center array for that.

The first being the latitude and the second being the longitude.

Then finally you're going to test your work.

Run this file.

Make sure you see the weather print from up above and make sure you see your lat and long coordinate

pair printing down below.

Once again there's no need to communicate between these two requests at all for now.

The goal is to have a completely separate request.

Just getting the geo coding service set up in our application in some way.

Take as much time as you need to knock that one out pause the video and when you're done come back and

click play

how'd that go down below.

I'm going to kick things off by first getting that you are well into my application code.

So over here we're gonna grab the U.R.L. exactly as we had it in the browser without making any changes

whatsoever.

And I'm going to store it in a new variable cost.

Now you are L is already taken.

So I'll use something like geo coding or geo code.

You are all perfect now that we have that variable set up we can paste the you are L right inside of

my single quotes right inside of the string and down below.

We're going to fire off our request.

So right here what do we do.

We call a request exactly like we did up above and we pass in those two important pieces of information

to the options object.

The first is the U.R.L..

Now we have that stored in our new geo code.

You are all variable.

And the second is the Jason in lower case property which we're going to set to true.

So the data gets passed automatically for us now and from here we can go ahead and move on and do the

function that's gonna run when we get our response back.

We know this function gets called with two arguments The first argument is the error which is not something

we've explored yet but something we will explore shortly.

And the other argument that is the response on response we can find the data we need.

Now this brings us to step 3.

We want to print the latitude and longitude to the terminal and we know we have both of those sitting

right here.

So we have to navigate through this data structure to get to those two values and we're gonna do that

in our function to start I'm going to create two variables to extract those two values.

Now this was not an essential piece to the challenge maybe you just went right into a console dialogue

call.

That would have worked just fine.

Right here though I'll start by creating a const and I'll call this 1 latitude.

I'm gonna set it equal to.

And we know we want to go to response dot body which is this object the one we've used before with the

dark sky API.

Now from there we want to access features.

So response dot body dot features.

That's an array of just one item.

We're going to grab that first one by index using bracket notation and then from there we want to access

what's on center.

So dot center now center is also an array.

The first one being the latitude so I'll grab that end.

There we go.

Now we have the latitude stored in a variable.

Let's go ahead and set up a another variable for the long etude

this variable is going to get its value from a similar place response dot body dot features accessing

the first item then dot center.

This is the second item with an index of 1.

Andrew from the future with one more quick interruption.

Once again I did reverse the order.

So up above you can see the code I just typed which is incorrect.

Down below we have the correct version of the latitude comes from the second item in that array with

the index of one and the longitude comes from the first item in that array with the index of 0.

I do address this in the video in a couple of lectures when I finally realized my mistake now we can

go ahead and actually print both of those values to the console so console log.

I will print latitude first then a comma to pass in a second argument to print long to tube.

Once again if your console got log call looks different.

Is okay.

The goal is to just get that information.

Printing it doesn't matter the exact format it's printed in for now.

The last thing to do was to test our work making sure this request and our code inside of the function

actually works as expected.

I'm going to go ahead and rerun the file.

This is gonna show both things it's going to show the lat and long as well as the weather.

And right here we have our data I have minus 1 1 8 which is exactly what I have over here and I have

34 which also matches up with the values I'm seeing in the center array.

Now that we have this in place we are all done with the challenge and we can remove those challenge

comments.

And now we have to API requests in our program.

The first the one we just created that allows us to convert an address into the lat long coordinate

pair.

And the second allows us to take the lat long and convert that into a weather forecast.

So the user gives us an address and they get back the weather for that location.

Now there's a lot more to say about various things related to asynchronous programming and HDTV requests.

So we're gonna continue on with all of this.

In the next video I'll see you that.


HANDLING ERROR----------------------------------------------------------------

It's nice when things go right when someone searches for a location and we're able to find a match or

when someone asks for the weather very set of coordinates and we're able to get and display the forecast

now.

We always hope that things go right but that's not always the case.

There are plenty of things that could go wrong with our HDTV requests and in this video we're going

to focus on handling those potential errors giving the user a better experience when things don't go

as expected.

Together we'll set up error handling for the weather API request.

Then as your challenge for the video you'll be setting up error handling for our geo coding request.

For the moment I'm going to comment out all of the geo coding related information down below.

By using Command Forward slash which would be control forward slash on windows.

When I have all of those lines selected and we're going to focus on what we have up above just the weather

request now.

One really obvious way things can go wrong when making an HDTV network request is if there is no network

available.

If you're not connected to the Internet.

This is indeed going to fail.

Let's go ahead and see this in action up above.

I'm going to temporarily turn off my Wi-Fi and we're going to do is run our script.

So from the terminal node space app dot J s when I do this what do I get.

I get a really long error message and the actual error says cannot read property body of undefined.

So in this case when things go wrong and there is no network request the error argument contains a value

and response does not.

So we have to go ahead and add a little bit of conditional logic making sure we're checking that there

is no error before we try to interact with the response.

Right now it's trying to read body of undefined right here.

Response is indeed undefined and that's what's causing the problem.

Now once again we can't fix the lack of network connectivity.

That's not the job of error handling in our case.

The goal is to do something a bit better than this.

Tell them in a regular human readable way that they currently don't have access to the weather API so

to get that done we're going to add an if statement right inside of our function before we do.

Let's go ahead and just console dialogue.

The error argument to the console so we can see exactly what we're dealing with and I'm going to comment

out the line down below which is currently causing the program to crash.

Now I will clear the terminal out but rerun the command and what do we end up getting.

We end up getting an error message now.

What's inside of here is not as bad as what we had before but it still doesn't contain information that

would be useful to someone unless they really knew a good deal about programming.

So what we're going to do is just check for the existence of that error object right here.

The if statement if there is an error we're gonna do one thing.

Otherwise inside of the else statement we'll do something else.

Now if there is an error we're going to go ahead and print a statement using console dot log something

that a person would actually understand.

Let's try unable to connect to whether service.

Excellent.

Now that we have that message showing up we can fill out the else part of the if statement in this case.

We want to print our forecast exactly like we were already doing so on comment out that line down below.

And then going to take the entire thing cut it out of its current location remove the extra lines and

paste it right here inside of.

Else so if error print an error message.

Otherwise print that forecast.

Now let's go ahead and try things out again from the terminal down below.

I'm going to rerun the program and what do I get.

Unable to connect to weather service showing up which is a great step in the right direction.

Now that we have this in place let's go ahead and make sure that our app still works when the network

request.

Excuse me when the network connectivity is re enabled.

So right here I am going to re enable Wi-Fi once again.

I'll wait just a couple of seconds then we'll rerun the script down below.

And this time there should not be an error and response should indeed show up.

So right here I am going to fire that often what do I get I get my forecast clear throughout the day.

It is currently fifty seven point seven five degrees with a zero percent chance of rain.

And there we go.

Now we have a little bit of error handling in our program making sure that when things don't go well

we at least give the user information that's useful.

And so in summary we have these two arguments error and response only one is ever going to be populated.

The other is going to be undefined.

So if we have a value for error there's not gonna be a value for response.

If I have a value for response we're not going to have a value for error.

So that's why our condition works so well.

If there is an error then we know we have one and we'll print the message if there's no error then we

know by definition we have a response and we can go ahead and use it.

Now this isn't the only type of error we want to guard against.

The other relates to user input.

What if we get a bad set of coordinates.

That's not going to be handled given our current setup.

Let's go ahead and explore that by cracking open the you RL in the browser.

So what I'm going to do is take this you El copy it to the clipboard and for the moment we're going

to take it over to Chrome so I'm going to open it up in a new tab like we did a few videos ago.

And what do I get back.

I get back the weather forecast as expected.

Now let's go ahead and mess up the input in the U.R.L. up above.

We could go ahead and demonstrate this by removing the longitude from the you are well up above.

I'm going to fire off their request and what do we get back.

We do not get back a forecast because we haven't provided enough information for a dark sky to know

where we want to get the forecast for.

This is Andrew with a quick update for the weather stack API.

We can also break this API though to get that done.

We have to make a slightly different change.

So right here we have our U.R.L. on the far right and we have our query in order to break the weather

stack API.

We'll just remove both the latitude and longitude.

So right here we set query equal to nothing.

And if I hit enter and fire off this request we can see that we don't get back a forecast.

Instead we're getting back an error right here please specify a valid location identifier using of each

query parameter.

So this is the approach we can take to generate an error when working with the weather stack API so

in this case we do indeed get a response with two properties we have the code property end the error

or property on the response body.

And in this case we need to add a little bit of defensive programming to make sure we print a useful

error message to the user in this situation.

So it's important to note that when we have invalid input the server the server in this case for Dark

Sky might respond and it's gonna respond with data that might be considered an error but it's not going

to populate this error object.

This is used for lower level OS things like the complete lack of a network connection if the specific

server you're contacting can't find the exact data you need that's typically going to come back on the

response body.

So right here we want to add an else if clause to our if statement to look at response and see if there

is an error code set up if there is we'll print a different error message saying something like unable

to find location otherwise once again we'll continue to print the forecast if we actually have the data

we need right here before the else.

I'm going to hit enter a couple of times adding some new lines we'll bring that back into the picture

in just a moment.

And on to the end of the current if statement we're going to add on and else if clause so we'll have

our condition and the code to run if that condition is true.

Now I can back the else clause up to the end of else if so if there is a low level OS error we're gonna

print this message if this thing happens we'll do something else in a second otherwise we'll print the

forecast.

Now in this case we are going to look at response

dat body and we're going to see if that error property exists.

If it does we know that something has gone wrong.

So right here we can use console dialog to print a message.

And in this case let's do something like unable to find location unable to find location.

Now we have some pretty decent error handling set up.

If things fail at a low level we're gonna make sure we get that message.

If things go wrong with the input we'll get another message.

And finally if everything goes right we will indeed get our forecast showing up.

Let's go ahead and test things out.

So over here what I'm going to do is break you are L exactly like we broke it over there.

I'm going to remove the comma and the long dude leaving just the latitude in place.

This is Andrew with a reminder that for the weather stack API to break things we had to remove both

the latitude and longitude.

So right here I can remove both of those.

So I have query equals nothing.

Then I set up my other query parameter for units.

This is what we'll need to do to break things using weather stack.

Now let's go ahead and save the script and down below we're going to rerun the program so node apt J.

S.

Now I do have a network connection so there should not be a low level error but in this case I do have

invalid input so I would expect this condition to run.

I'm going to fire off the command and what do I get down below.

Unable to find location.

So now we have some pretty decent error handling set up allowing us to catch a lot of these edge cases.

Now if we go ahead and fix things I'll add a comma on and I believe it was something like minus 1 1

2 or 1 2 2.

We can go ahead and save the program rerun things for a final time and ensure we are still getting the

weather.

Clearly I was off I got a lot colder and a short period of time but we do indeed have a valid coordinate

pair and we are indeed getting to the end no low level errors no problems with the input which means

we print the forecast now it's challenge time where you're going to do the same thing for our Geo coding

request.

So to kick things off I am going to comment out all of the code related to our weather request will

obviously come back to that soon.

I'm just commenting out so we don't have a bunch of different things printing to the terminal and down

below we are going to uncommon the code for the geo coding API request.

Now right here I had a couple comments to illustrate exactly how geo coding was going to fit into the

big picture.

I'm going to remove those and this is where I will paste in the challenge comments.

Now in this case it's gonna be your job to setup error handling for the geo coding request and there

are four steps for getting this done.

Step one you want to set up an error handler for low level errors so that's when the error argument

exists.

And the response does not.

In that case you can print a message like unable to connect to location services.

Now once you have that in place I'd like you to test your work by disabling your network request and

making sure that when you run the app you see that error message print.

Instead of seeing a really long cryptic stack trace now inside of the else clause you're going to continue

to do whatever you're currently doing so that handles the first type of error.

The other one is to set up an error handler when there's no matching results and we're going to explore

that right now by taking our you are from the browser and messing it up.

So over here in my other tab I had that you RL we explored when we initially set up geo coding and if

you remember the search term sits right here so it is forward slash geo coding forward slash v five

forward slash map box dot places forward slash your search term dot Jason.

So in our case we're searching for Los Angeles.

If I search for something like twelve what what am I going to get back.

I get back the following.

We still have those same four root properties type query features and attribution.

Then you'll notice that this time around features is an empty array.

So if we are getting an empty array obviously we're not gonna be able to look in that array like we're

doing right here to pull out the latitude and longitude.

So you want to set up an else if like we did above.

But you want to check if the features array has a length of zero.

If it does you want to go ahead and print a message saying something like unable to find location.

Try again with different search term then you want to go ahead and actually test that out by messing

up the you are well over here to generate zero search results running the program and making sure you

see that message print.

So just to demonstrate if I do swap out Los Angeles in the you are well right here with something like

12.

What and save the file.

I can indeed rerun the script down below.

And what do I get.

We're back to a big ugly stack trace.

The problem being that there is no center property on undefined undefined being the object we're trying

to access which does not exist in the features array because in this case the features array has zero

items inside.

I'm going to undo that change bringing the search term back to a valid one.

Now it's time for you to knock this one out.

Take a moment to pause the video test your work and when you're done come back and click play and we'll

work through the solution together

how'd that go.

I'm going to start with step 1 and ensure that we're handling those low level errors.

So right here what am I going to do.

I am going to start by disabling my network connection.

I'm gonna turn off Wi-Fi then if we were to rerun the program obviously things would indeed fail.

Let's take a quick moment to do just that.

I'll use the up arrow key and enter.

And what do I get.

I get the very long cryptic message saying that there is no response so we can't access the body property

on it.

We can address this by adding the if statement in if there is an error.

Then we know we want to print a message.

Otherwise inside of else we know there's a response and we can go ahead and do what we were doing before.

So I'm going to take these three lines.

You might have had just one if you chose to solve that challenge in a different way.

I'm going to cut them out and bring them up inside of else.

Once we have that in place we can go ahead and pick an error message for when there is no network connection.

Right here a console that log call to print something and I'll use something like unable to connect

to location services.

Excellent.

Now that we have this in place we've finished Step 1 at least hopefully and we can test things out down

below.

Once again I'll use the up arrow key and enter to run the script.

And right here we get unable to connect to location services.

Now if I was to read enable my network connection I would expect that we do indeed get a latitude and

longitude printing.

I'm going to rerun the program with the network enabled and what do I get right here.

I do indeed get my coordinates which is awesome.

Next up we want to make sure that when the search term returns no results.

We do indeed print a message letting them know we can't find that location.

First up let's recreate this error by messing up that search term.

I'm going to remove Los Angeles I'll replace it with some mumbo jumbo.

Like 12 followed by the word what.

And now if we were to rerun the program once again we would be back into a failing state.

And that's okay because we're gonna address that in just a moment right here.

Cannot read property center of undefined so the undefined thing is the object we're trying to access

from the features array the features array is empty in this case as we saw.

So there is not going to be an object and that object doesn't exist.

So it definitely won't have a center property to address this.

All we're going to do is add.

Else if like we did before.

I'll move else down below for just a moment.

Add.

Else if with a condition and some code to run when that condition passes then I'll bring the else clause

back into the mix.

Tacking it on to the end.

Excellent.

Now what's the condition in this case.

We want to run this code printing another error message.

If the array is empty so if response dot body dot features has a length equal to zero.

If it does that's a problem and we're going to print a message console dot log.

I'll print something like unable to find location.

Try another search perfect.

Now that we have this in place we can move on to the final step which is to make sure we actually see

this message.

When that array is empty I'm gonna go ahead and rerun the program once again and what do I get.

Unable to find location try another search.

Now let's wrap things up by bringing it back to a working state.

I'm going to remove 12 and what it'll be forward slash Philadelphia Dot.

Jason I'm gonna save the program.

That should indeed return a result.

And if I rerun the program I would expect to see the coordinates for Philadelphia and that is exactly

what I'm getting.

So error handling isn't the most fun thing to add to your application but it goes a long way towards

making sure you have a professional setup where users actually understand what's happening.

If things fail for the moment I am going to remove those challenge comments and save the file.

That's where we're going to stop for this one.

We now have a pretty good setup printing the nicer results when we get them but obviously sometimes

we don't go down that happy path.

And in this case we are indeed also handling those errors.

That's it for this one.

I'll see you in the next one.

CALLBACK FUNCTION--------------------------------------------------------------
In this video we're gonna take some time to explore callback functions in detail in this section.

Already I've probably said the word callback or callback function upwards of 20 times.

And now it's time for a dedicated video where we really dive deep into the callback pattern to see how

it works and how we can take advantage of it by creating our own.

Now why is this so important.

Because it's at the core of asynchronous no J.S. development.

It is something that's going to come up over and over again throughout the class.

And it's something that's worth investing in early on in our education.

So we're more comfortable with it as we continue to use it.

Let's go ahead and kick things off by moving into the playground directory for just this video.

I'm going to create a brand new file inside of here.

I already have one through three so I'll call this four hyphen callbacks dot J S and in here we're going

to explore callbacks in isolation.

Let's go ahead and start with an example we're already very comfortable with.

I'm going to call set time out like we've done plenty of times before passing in these two arguments

it requires.

The first is a function and the second is the amount of time to wait in milliseconds before that function

gets called.

And we're just going to wait two seconds and we'll print a message console dot log.

Two seconds are up.

Excellent.

In this three line example there is a single callback function and that is the function we define and

pass in as an argument to set time out.

So this is a callback function a callback function is nothing more than a function we provide as an

argument to another function with the intention of having it called later on.

So in this case we are providing a function as an argument to set time out with the intention that set

time out is going to call this function at some point in the future.

That is all a callback function.

It's now in this case we are using the callback pattern in an asynchronous way as we saw set time out

is a node provided API and it is indeed a synchronous.

Now that does not mean every time we use the callback pattern it's actually a synchronous.

This is a point of confusion for a lot of people.

We've actually already proven this.

We know that set time out uses the callback pattern and it's asynchronous and we know that our array

methods like for each and filter use the callback pattern but they are indeed synchronous.

So right here let's create a concept called short names.

Actually let's just call this one names will create short names in a second.

And I'm going to toss my name in there along with Jen and Jess.

And the goal is to use callbacks with filter something we've done before.

So const right here short names equals I'll access names dot filter to use the filter function and once

again we're going to provide a callback function.

I'm passing a function to another function with the intention of having it get called later.

So right here this callback function as we know will actually get called one time for each item in the

array with the individual item.

In this case we could call it something like name and all I'm going to do is return true if the name

has a length less than or equal to four.

Those are the short names we'll keep.

So return name dot length less than or equal to four.

In this case we are indeed using the callback pattern as well but there's nothing asynchronous about

filter it's not interacting with a native node API it is just standard javascript code completely synchronous.

So far the only time we've used the callback pattern is when we're working with a function that we never

defined.

So we pass a callback to set time out.

That is a node j s API and we passed a callback to filter also not defined by us.

That comes from javascript.

Now this is not to say it's never useful to define your own function that takes a callback because it

actually is and it's something that we're going to use in the very next video.

So let's take a quick look at app dot J.

Let's imagine in my program there are four different places where I want to be able to take a location

and get the coordinates back.

So I want to be able to geo code.

Now what is that going to look like.

Well if I have four or five different locations I need to do this.

I have to take this code and I have to put it in four or five different places.

And obviously that's not ideal.

So what we would do is we would create a function called GEO code or something like it and all of this

code would go inside of there.

Now in order to get that done we're gonna have to be pretty familiar with the callback pattern.

So let's go ahead and see what this would look like over inside of the callbacks playground file.

Let's create a constant.

And I'm going to call this constant geo code.

Now this is indeed going to be a function we define and we're going to set this function up to take

in a callback function much like set time out takes in a callback and much like filter takes in a callback.

Now you can take in as many arguments as you need along with the callback for example set time out takes

in the function as well as the amount of time to wait for geo code.

We could say that you need to provide the address.

Otherwise we don't know what address to geo code and we can say that you also need to provide a callback

which is the function that will end up calling once we have the data.

Now for the moment we're not actually going to do any geo coding inside of here.

We're just going to make up the results to keep things simple.

So for the moment let's create a concept called data and we'll just set up latitude and longitude properties

setting up random values for each.

So on data I'm gonna set up latitude as a property and I'll just set the value to zero.

Then we're also going to have our longitude and I'll set that to zero as well.

So let's say that at some point in the future yes we get this data back by calling request.

Now what do we do with it.

The goal is to give it back to the caller of geo code.

So if I call geo code and pass in an address like Philadelphia I want to get access to those coordinates.

Now we know there are two ways I could get this done.

One it could be the return value from the geo code.

Function like we've seen with pretty much every function so far.

Or we could provide a callback and get the data there.

Now if this was our actual function the choice would be easy.

I would ignore and remove that callback argument and I would just return the data then down below I

could access that data const data equals whatever comes back from Geo code and I could use it down below

console log data.

Perfect.

Let's go ahead and save the file in its current state and move over to the playground folder to run

things.

So that's gonna be C D dot dot forward slash playground to get over there once we're there I will clear

the terminal output and from here I'm gonna run the file so node 4 hyphen callbacks dot J.

S.

Now when I run it I'm going to expect to see my data showing up and it is and then two seconds later

I get my little message from the example up above.

The problem here is that there's nothing asynchronous happening inside of here.

Later on we're actually going to use request inside of here and we know that's a synchronous for the

moment as we explore the callback pattern.

Let's just use set time out to simulate this delay.

So I'm gonna take all of the code inside of the GEO code function.

I'm going to use command X or control X to cut it out copying it to the clipboard because we'll paste

it in in just a second from here.

I'm gonna use set time out to simulate a delay and let's go ahead and provide the function to run when

we're done and we'll provide the time to wait to keep things easy to see in the terminal.

I'm gonna pick a longer than average time.

I'm going to stick with two seconds though in reality this process would take just a fraction of a second.

Then I'm going to paste the old code exactly like we had it inside of these set timeout callback.

Now let's go ahead and run the program again to see what happens in the terminal.

I'm gonna use up and enter and we can see that right away.

Much shorter than two seconds we saw undefined printing.

So the problem here is that Geo code this function it's not returning anything.

Look at what's inside of this function.

There is a single call to set time out.

There is no return statement directly inside of geo code.

So geo code finishes almost immediately.

And if you don't return something from a function we know that JavaScript will implicitly return undefined.

So that is what we end up seeing.

Now yes there is a return statement in geo code but it is nested in another function so that return

statement is returning from this function not from this one which is why we're not getting a value back.

So the return pattern is no longer going to work for us when we start to do asynchronous things inside

of our functions.

And that's where the callback pattern is going to come into play.

So let's change our code to use callbacks and get it back to a working state.

The first thing we're going to do is remove the expectation we have right here that Geo code is going

to return some sort of useful value that's not going to happen.

Remember that when we explored how everything works behind the scenes none of our callback functions

the ones that go to no API then come down to the callback queue.

They don't get executed until the call stack is empty.

That means Maine has to finish right here we're trying to say that one of those callbacks should finish

before main finishes and that's never going to happen.

So we have to adjust what we're gonna do is we are going to remove data and remove our console log geo

code is not going to have a direct return value and that's ok it's expected what we're going to do from

here is provide that second argument.

The first one is address currently Philadelphia.

The other one is a callback which is just going to be a function.

So right here I am going to provide a function as the second argument.

Now you could have reversed the order or added as many or few arguments as you needed in this case 2

was the perfect amount for us.

Now this callback function is going to get fired at some point in time and the question is what things

are we gonna have access to.

Well that's up to us to choose.

So right here instead of returning the data we're gonna go ahead and call the callback function passing

the data in as that first argument.

So if we're calling the callback with data as the first argument that means we're calling this function

with data as the first argument.

So right here I can name that first argument so I could access it.

I'm gonna call data.

But I could call it anything.

I wanted to.

This name does not need to match up with this name.

It is the position that matters here it's the first argument down below it's the first argument and

now we can use it.

So console log data and now we're using the callback pattern in our little fictitious example.

So let's go ahead and run the program one more time.

Now we're going to wait those full two seconds as expected.

We then get access to the data we call the callback.

Our message prints and what are we seeing down below.

I am seeing my latitude and longitude showing up which is a great step in the right direction.

So if our function is completely synchronous like geo code was before we're able to use return to get

a value out of the function and back to the part of the code that called that function when our function

starts to do something asynchronous though that's no longer an option.

So instead of returning a value we take a call back in and we call the callback with the value we want

to send back when we have it.

This accomplishes the same goal as the return statement does.

It still gets the value back to the code that needs it.

Now that we have this in place it's time for a quick challenge where you're going to do something similar

creating a little function that uses the callback pattern.

Once we're done with that in the next video we're actually going to use the callback pattern inside

of app dot J S with our geo coding and our weather fetching functionality.

So to find the challenge for this one we can head over to a U R Well that's links dot Mead dot I O forward

slash callback.

This is going to redirect us over to another Github Gist and we're going to do is take all eleven lines

of code and we're going to bring them over to our four callbacks file.

Now before I paste them in I am going to highlight all other lines and comment those out.

So nothing else is running though I'll keep them in place as a reference for the future and down below.

I'm going to paste the challenge comments in and we'll notice that this challenge also comes with a

little bit of JavaScript code.

The goal here as stated is to mess around with the callback pattern like we did up above for geo code

and like we did for geo code.

We're gonna stick with a simple set time out call to simulate some sort of asynchronous process.

Now you're going to define an add function that accepts the correct arguments and the usage is actually

down below.

So add it takes in three arguments it takes in two numbers.

These are the numbers that get added up and it takes in a callback which is going to get called after

a two second delay with the sum.

Then the code prints the sum.

So your job is to get this code working.

Now what's step 1 defined the add function with the correct arguments as seen below.

Step 2.

Use set time out to simulate a two second delay after those two seconds are up.

Call the callback function with the sum.

That means you're calling this function with the correct sum.

Then you're going to test your work.

If your definition of the add function is correct when you run the program you should see the number

5.

Printing after 2 seconds.

All right take some time to define that function right here when you're done come back and click play.

How'd that go.

I'm gonna kick things off by creating a brand new variable cost add I'm gonna set that equal to a new

function and this function is gonna need to take in all three arguments.

We have two numbers and the callback so I could use something like a and b or X and Y then the callback

function which is typically called callback but it could be called anything you wanted to call it.

Next up we have to simulate an asynchronous process by using set time out to cause a two second delay.

So right here I'll pass in my callback function and two thousand milliseconds as the second argument.

That brings us to step 3 after those two seconds are up.

We want to call the callback function with the sum.

Remember I can't use return here because I'm returning from this inner function not from ADD.

So instead of using return I will call callback.

Now what am I calling it with a single argument the sum that's going to be a plus b.

Now maybe you created a sum variable first and past that in or maybe you added them up right inside

of the arguments list.

Either way would get the job done.

Now from here we can test our work.

I'm gonna save the callbacks file.

I'm gonna rerun things down below.

We wait are two seconds and what do we get.

We get the number five printing.

So now we have a bit of experience working with this callback pattern.

We've seen it used with set time now to simulate the asynchronous process and then the next video we're

actually going to use it with our request calls where we get that each TTP request data back.

Let's go ahead and wrap this one up by removing those challenge comments.

I'm gonna save this playground file and then the next video we're gonna move back into the weather app

directory.

I'm excited to integrate callbacks into our weather application.

So let's go ahead and jump right in to the next

CALLBACK ABSTRACTION------------------------------------------------------------------------------------------------------------
In this video you're gonna use the callback pattern to improve the weather application.

So in the last video we made a fake version of a geo code function which took in an address and a callback

and I got you the data when it was available.

Now we faked that by using set time out in this video.

We're going to create a real version where we actually create a HDTV request inside of the function.

Now what's that going to allow us to do.

Well it's gonna allow us to do two very important things.

One it's gonna make it easy to create code that is reusable and easy to maintain by having separate

functions we can call we can run this code as many times as we need without copying it over and over

again if I want to get the forecast in five different locations.

I just call a function five times as opposed to needing to copy all of this code and logic.

The other important thing is that it's going to make it much easier to do one thing before or after

something else.

So in this case we want to first geo code the address then I want to take the output the latitude and

longitude and use that to fetch the weather.

Now we could do this without creating our own functions but it would be pretty terrible.

We can show you what that would look like by UN commenting all of the code up above copying it to the

clipboard and pasting it in where it would be needed which is down here.

So right after we get access to the latitude and longitude I could paste all of that code in and right

away.

It's just stressful to look at.

Now if I was going to continue forward with this I would update that you are all over here concatenate

ing on those variables and that would indeed work.

There are a lot of problems with this code.

First it's hard to read and maintain.

Second it is deeply nested going up to six layers at some point which just makes code more complex than

it needs to be.

And third it's not reusable at all.

If I want to fetch the weather somewhere else I can't because it's nested inside of all of this other

code.

In reality we're trying to perform two discrete actions so we should have two discrete functions we

can use.

I'm going to undo those changes I made.

We're not going to go that route.

We're going to undo them back to the point where we had at the beginning of the video.

We have two separate requests which are currently not communicating with one another.

Let's go ahead and fix that by creating our little functions.

And together we're going to convert our geo coding example.

Then as your challenge for the video you're going to end up doing the same for our weather.

Request up above.

Let's go ahead and get started by commenting out that weather request and we're actually also going

to comment out our current geo coding request down below.

We're going to do two things.

We are going to define a function and we're going to call it.

Let's start by creating a const geo code like we did in the other file though this time it's actually

going to communicate with the map box API.

Now we still need those arguments.

So what's the input.

What do we need to geo code.

I need to know the address.

So that's going to get taken in as the first argument.

And the second is going to be the callback.

This is the function we'll call.

Once we have the latitude and longitude.

Now from here we are indeed going to call geo code.

So we're going to define this function which means we probably want to use it.

Let's go ahead and add an example call in down below passing in an address.

I'm going to use my current location Philadelphia.

Then I'm going to pass in a callback as well.

This is where we're gonna have access to the results after the geo coding process is complete when you're

working with callback functions and the callback pattern.

It's typical to see two arguments passed two callbacks and that's exactly what we're gonna do here.

You either get an error if things went poorly or you get your data if things went well.

Now this is not enforced but it is a common convention you're going to see across many different tools

utilities and libraries including what we've already seen with request if things go poorly we get an

error otherwise we get our response.

Only one of these is ever going to have a value the other will be set to undefined allowing us to conditionally

check what's going on.

Now we have to actually make sure that callback gets called with the correct arguments.

So let's go ahead and kick things off by making our request now up above.

We already have that you are well in place.

I'm gonna take the U.R.L. exactly as we have it up above not including those quotes and I'm going to

copy it to the clipboard.

So this is that you are all I should be able to paste in the browser to see the geo coding results for

the current location which is statically defined as Philadelphia.

I'm going to bring that down below and store it in a U RL variable so I'll create the variable I'll

define the string and I'll paste the U.R.L. in now the entire you are rel is gonna be static except

for this one piece right here.

This is where the address goes.

So I'm going to remove Philadelphia and I'm going to use the single quote twice.

Then I'm going to use the plus operator right here.

Now currently we're just taking the string beginning and the string end and putting them together right

in between we want to put the address.

So now we take the beginning of the U.R.L. then we have the address.

Then we have the end of the you are well and now we're gonna make a request to whatever location is

provided via that argument.

So in this case it would be Philadelphia but I could change that to New York if I wanted to geo code

somewhere else.

This is Andrew from the future with a quick update to the line.

We just wrote right here we have the before line.

This is the line we just wrote together.

We have the two parts of the U.R.L. are two strings and we can connect the address right in between.

Down below under after we have the exact same thing.

The only difference is what we're adding in between right here instead of just putting the address right

into the string we're first passing the address through a function called ENCODE.

You are a component now that function returns a string and that's going to get placed in the you are

out now in almost all situations.

You're not going to notice a difference when you run the project with these two different solutions.

The only time you're really going to notice is if someone searches for a location that contains special

characters that actually means something in a U structure.

As an example if you were to use this code up above and search for a question mark the program would

crash down below.

When we encode those special characters the question mark becomes the encoded version which for this

particular character is the percent sign then three capital F..

This is a safe U.R.L. map box is going to be able to get it decode it and handle the request correctly.

So take just a quick moment to replace address with this function call right here then test out your

code and make sure things still work as expected.

All right let's jump back into the class now that we have a dynamic you are L based off of the arguments

to the Geo code function let's actually fire off the request.

I'll start by calling request passing in the options object as the first argument we are going to set

up.

You are all property.

I have the value in the you RL variable and from there I'll also set up Jason as true making sure the

data gets passed for us.

Next up we do have to provide these second argument a function to run when the request completes.

Right here I am going to provide my function like we've done with our two other request calls and like

those calls for example.

Right here we get access to error and to response and we're gonna use both of those down below.

Now what's the next step the next step is to once again use an if statement to figure out exactly what

happened.

Did things go well.

Did things go poorly.

That's the next thing we have to do.

So right here we're going to start with an if statement I am going to check if there is an error.

If there is we are going to do something like we did before.

Now the important piece to the puzzle is the actual message up above.

We chose to log that message to the console now down below.

The goal is to create a function that is highly reusable.

When someone calls geo code they might want to do something different with the error message then log

it to the console.

Maybe they want to save it to a log file on the file system or send it to their sysadmin via an email.

Those are all things you could do with the message and it's up to geo code to be as flexible as possible.

So instead of logging out and the error we're going to pass it back to the callback the callback can

then choose what to do.

So I could call geo code five different times and do five different things with the error message.

So right here inside of the if statement what are we going to do.

We are going to call callback for the very first time in this function.

Now we know that the callback function expects two arguments.

We're gonna have an error if there is one.

Otherwise we'll have data.

Now in this case we do indeed have an error.

So we are going to provide the first argument and we're gonna provide undefined as the value for the

second right here.

Let's go ahead and set up these string.

So we are going to call the callback with a string for the first value.

Now the first argument and the first one line up.

So this is the error and we are going to say exactly what we said up above.

Unable to connect to location services.

Perfect.

So now that message is getting sent back to the caller and they can choose to do whatever they want.

Making geo code as flexible as possible.

Now remember we don't want to provide a value for that second argument if we don't provide anything

here undefined will be the value assigned by javascript.

We could always be a bit more explicit setting up undefined though both solutions would be identical.

So we've handled the if statement with the error.

Now we're going to move on to the else.

If so else if our condition and the code to run in this case we want to check if the features length

is zero meaning that we didn't get any search results down below.

Let's knock that out.

So right here.

Else if response dot body dot features dot length.

So we're looking at the length of that array equals 0.

If it does we have a problem.

What are we going to do.

We are going to call callback.

So in this case we are also trying to report an error.

So we're going to provide these string message as the first argument and undefined as the second what

do we want to say.

We'll say exactly what we said up above.

Unable to find location.

Period.

Try another search.

Excellent.

So now that we have this in place we actually have error handling all set up.

This callback would correctly get called if something went wrong with their request.

Let's test our work before going any further inside of geo code just to make sure things work.

We will choose to use console log but it's important to note that's a choice because we just get the

rostering back.

We could do whatever we want with it.

Right here I am going to print error then as the second argument I'll print the actual error message

and down below I'll do the same thing for data.

Just making sure that we're always getting the results we expected.

I'll call console dialogue with the data string then I'll actually print the data variable.

Now to test things out we want to first do something like disable our internet connection and make sure

we get that message so up above I am going to turn off my Wi-Fi and down below in the terminal.

We have to get back over to the weather app directory so S.D. dot dot to get out of playground.

Then forward slash.

Weather hyphen app.

Once I'm there I'm gonna use clear to clear the terminal output.

Then I'll run the script node space app dot J s when I run it.

What are we gonna get right here.

I get as my error unable to connect to location services and as data I get undefined which is fantastic.

That is exactly what we were looking for.

Now let's go ahead and read enable our network connection and we're going to try with a location that's

not going to return any matches down below.

I'm going to swap out New York for something else like 12 what I'm going to save app dot J S I'm going

to rerun the exact same command and what do I get.

Unable to find location.

Try another search.

So all of our error handling is done.

We can now move on to the easy part which is to set up the else clause and call the callback with the

data that we want to expose.

Now once again it's our choice.

How much of what comes back on response.

Do we want to share and the reality is we only want to share a couple of values.

I'm gonna choose to share the latitude and longitude.

And I'm also going to share one other value that came back.

If I go back to the request in the browser I can swap it out with a real search.

I'll the search for Philadelphia once again and these are the two values we're gonna start with.

And I'm also going to include the place name.

So when we print out the forecast we can include a more complete description of exactly where they're

getting the weather for.

All right let's go ahead and work on that by filling out else.

Right here we are going to call the callback and I am going to provide to it two arguments.

The first remember is where we would put the error but in this case we know there is none.

So I am going to set that value equal to undefined.

That's going to make sure that when the callback runs it does not have a value for error and it has

a value for data.

So the second argument I passed a callback that's going to be the data when things go well we're going

to provide the caller the caller down below with those three values the latitude and longitude and we're

going to provide them with a place name that label we just explored.

Let's go ahead and knock all of that out using the exact same stuff we did up above.

So first up we have latitude.

I'll set that up as a property on this object.

We know the value for that lives on response dot body dot features we're going to access the first item

in that features array and then we're going to access the center property which is an array itself and

we'll grab the first item from that which is exactly what we've already done up above.

Next up we're going to add a another property onto here longitude this value is going to come from response

dot body dot features grabbing the first one then dot center grabbing the second one.

Perfect.

This matches up with what we had up above.

Next up we're going to add that other property.

Now I could call this place name but I could also choose something that makes a bit more sense.

I'll just have location right here.

We are going to get that value from response dot body.

We still need to go into that first feature.

So dot features grabbing the first item from there we have the place name and property.

So that would be dot place name dot place underscore name.

Perfect.

Now that we have this in place when things go well when the search returns results we are going to get

that object sent back as the value for data.

Let's go ahead and see if that actually happens.

Right here I'm going to swap out 12 what with something else I'll choose to use my current location.

Philadelphia.

I'm gonna save the file.

I'm going to rerun the script from down below.

And what do I get.

I get the latitude the longitude and the label showing up.

Now if we wanted to change what we were searching for we could just update the geo code first argument.

Right here there is a Philadelphia in New York as well though it's less popular.

So I'm not going to get that back as the default result but if I do add new york on and I search for

that I can now see the latitude and longitude for that city instead.

Now we can easily call geo code more than one time to geo code from different places in our application.

We have all of that sitting behind a single reusable function we can use as many times as we need.

Let's wrap up by pulling that out into a separate file then we'll move on to the next video where you're

going to do something similar for the forecast.

I'm going to close all other files besides app dot J S I'm going to make a new directory over in weather

app which I will call you tills and in there we're going to make a single file for now.

So we will call this one something like geo code dot J.

S and all we're going to do is take the function code from over here.

We're going to remove it from Epcot J.S. cutting it out to the clipboard and we're going to paste it

over here.

Now I am going to have to require request.

We'll do that real quick const request equals what comes back from calling require and passing in the

module name then down below.

We're going to export it.

So module dot exports equals the geo code function.

Perfect.

Now this file's all done and we can easily require this anywhere we want to use it including an appetite

and J.

S Let's go ahead and wrap up by doing just that up above.

We're going to grab the constant geo code from a call to require and since we're loading in a local

file we start with DOT forward slash.

From there we want to go into the utilize directory then forward slash the file name which is geo code.

Once again leaving off the optional file extension.

Now I'm going to save things I'm going to swap out the location for somewhere else.

Let's go ahead and use something like Boston.

I'll save the file I'll rerun the script and this is going to make sure that things are still working

and right here we are getting the location information for Boston.

Excellent.

Now that we have all of this done for geo code it's going to be your job in the next video to do the

same thing for our weather request.

I'm excited to get to that.

So let's go ahead and jump right into the next video where I'll show you what I'd like you to do.

CALLBACK ABSTRACTION CHALLENGE----------------------------------------------------------------------------------------------------------------------------------------------------
In this video it's time for you to do the same thing we just did to geo code.

But for fetching the forecast.

Now of course there are challenged comments.

I'm going to walk you through exactly what I'd like you to do although it's going to be very similar

to what we just did.

Now before I even pull those up we can remove the old commented out code where we were making our geo

code request that's no longer necessary as we have a replacement for that over in the geo code file.

Now I am going to still leave the commented out forecast code in place as there's no need to re go through

the logic in our head.

We can essentially copy and paste that stuff into the new function.

We're gonna end up creating.

Now it's time to talk about what I'd like you to do and I do have comments for this challenge.

Now I'm going to include an example function call as well so I'll show you where you can find all of

that on the web.

Once again it is over at Lynx dot Mead dot I O forward slash.

This one is forward slash forecast when you visit that it is going to bring you over to a set of challenge

comments as well as an example function call to make sure we're all working towards the same goal.

I'm gonna take the contents of this file.

I'm gonna bring them over to app dot J S and I'll paste them down at the bottom below the call to geo

code if you'd like.

You could also comment out the call to geo code.

So you're not seeing so much output in the terminal.

Now let's go ahead and talk about what I'd like you to do.

The goal here is to create a reusable function for getting the forecast much like we created a reusable

function for geo coding a given address.

Now you're going to create this function forecast in a separate file.

You can create it in the forecast dot J S file which you'll make in the utilize directory.

Once you have the basics set up once you have the function defined and exported you can require it in

app dot J S and call it as shown below.

So this is a sample call you can use as you're building out the function.

It's nice to know what we're working towards in terms of the arguments expected.

Now step three once you have that basic structure in place it's time to fill out the function.

In the end of the day you're going to use the same conditional logic we used up above.

If there's an error we're gonna do one thing.

If there is an error property on the body we're gonna do something else.

Otherwise we will go ahead and generate that forecast strength down below.

You're still going to do those same three things right here for each of those.

You're going to call the callback function exactly like we did for geo code where we have three separate

distinct calls to callback depending on what exactly happened when the request was made.

So over here for low level errors pass a string for the error just like we did with GEO code we got

a string argument back and the same thing is gonna be true for coordinate errors.

You can always test that by converting one of these to a string and adding a letter inside of it.

Last up the success case in this case I would expect that our callback gets called with not an error

but with data now data should be a string matching up with the forecast string we had generated up above

where we use the summary and then we move on to say it's currently the temperature out and there's an

X percent chance of rain.

So in the end of the day the goal isn't to change the functionality at all.

The goal is to just break all of that out into this separate function that we can then use and reuse

throughout our application.

If at any point along the way you're not quite sure what to do.

Just look at the code you wrote for the geo coding example because in the end of the day both are going

to look very similar though obviously the response data and the U.R.L. are slightly different just as

a reminder if you're using the weather stack API you already have the correct stuff in place so you

shouldn't need to make any code changes that you are L you're going to copy is already the weather stack

U.R.L. and the data you're going to print will already work with the weather stack response as it did

before.

All right take some time to knock that out test your work and when you're done come back and click play.

How did you do.

Hopefully you were able to get through that without too much trouble.

As always we're going to work through these solution together now.

This was by far the most code you had to write for a challenge.

And as these challenges get harder you might have a harder time solving them and that is okay.

It is by design.

The goal is to give you more room to experiment play and learn and less guidance.

And that is going to be an important piece to the puzzle.

Though it can be frustrating at first because you'll feel like you just learned this thing and you get

it but you can't put it into action and that's OK.

That's what the challenges are here to help with.

So let's go ahead and get started.

I want to create that function in a new file.

Export it and require it over here in utilize dot J S I'm going to create the forecast J S file.

Let's go ahead and start by not misspelling things then we're gonna go ahead and do what we need to

do which is to create a forecast function.

So right here forecast equals a brand new function.

We'll worry about the arguments in just a moment and once we have this function in place what are we

going to do.

We are going to export it.

So down below module dot exports.

Exporting the forecast function.

Now we can go ahead and require this file to get the function in app dot J.

S that's gonna make our function call actually work up above.

Let's go ahead and get that done const forecast equals I'll be using require to require one of my own

files.

So dot forward slash in the utilize directory.

Forward slash the file name.

Forecast leaving off the J.S. extension.

So now we actually have access to that function which means that when I try to call it at least things

won't crash and burn.

So that is step one and step two.

We have the basic functions set up.

We've loaded it in and we have our example call down below.

From here we actually need to fill out that function and let's start with its arguments.

Now as I showed you below we have the latitude.

Then we have the longitude.

Then we have the callback function.

So we have to setup all three as arguments for forecast right here latitude.

Next up would be longitude.

And then finally the callback which once again you could have called anything at all.

These names are particularly important.

You could pick anything that makes sense in my opinion though these make the most sense down below.

It's time to start the process of making that request.

Now if we are going to use the request module we should probably load it in right here.

Const request equals.

I'll use require to load in the request module and once we have it loaded in we're going to actually

use it.

Now we do need the U.R.L. and we already have that you are L an aspect J s so you could have copy and

pasted this over up above.

I'm going to grab the U.R.L. I'll grab everything inside of the quotes I'm going to copy it to the clipboard

scroll back down and bring it over to the forecast file right here.

I will also create a concept you are El variable I'm going to paste the value in and now we need to

swap out thirty seven point eight to six seven with whatever value we have for latitude and we want

to swap out the minus 1 1 2 with whatever value is passed in for the longitude right here.

Let's go ahead and get that done.

Remember we need a comma in between.

So I'm gonna remove the LAT end the long and the comma ending with that forward slash.

Then I will concatenate on the latitude by referencing that variable after the plus operator and then

I'm gonna concatenate on a comma.

Then finally Elkin can it on the longitude.

Perfect it's Andrew with another weather stack update.

So up top that we have the old the dark sky U.R.L. with those variables in place down below we have

what you should have which is the weather stack U.R.L. with the latitude and longitude variables in

place.

So we set up the base U.R.L..

Then we add the latitude from there we add our comma followed by the longitude.

And finally we wrap things up by setting up our units.

So make sure you have that bottom line in place to successfully set things up now this is going to be

the complete U R L with dynamic coordinates inside.

We can now actually fire off the request to get the response which would be the forecast information

for this particular location.

I'm gonna kick things off by calling request like we have done plenty of times before with those two

arguments.

Our options object being the first one and the callback function being the second one.

Now we can provide the correct options for the options object we have U.R.L. which is going to come

from the.

You are all variable and we have Jason the value true.

Perfect.

Next up we have the callback function itself.

This is for request and we know that it gets called with an error if any and a response.

If there is no error now we can actually set up the if statement much like we had before.

So we'll start by checking if there are any low level errors by looking for the existence of the error

object.

Next up we'll use.

Else if to check if the coordinates are bad right here to do that we're gonna look at a response dot

body dot error and that is exactly what we did before an app that J.

S the old code used that condition from there.

We have to set up some code to run if the coordinates are bad and last but definitely not least.

Else this is the code we run.

If everything went well and there's a forecast to provide now let's go ahead and actually call the callback

function which currently is not being used.

So if there is a low level error what are we going to choose to do.

We are going to go ahead and call the callback with the first argument the error and no value for the

second argument which is data.

So we want to provide a value here and we don't want to provide a value here.

Let's go ahead and get that done.

I'm gonna call a callback passing in a string for the first argument and undefined for the second.

Now once again you can leave the second argument off completely as undefined as the default value for

an on provided argument anyways.

Now we can pick our message I'm going to use the message we used before unable to connect to weather

service.

Perfect.

Next up if there's a problem with the coordinates we are once again gonna call callback.

Now things went poorly so we provide a value for the first argument and we leave off a value for the

second argument.

We can pick whatever message we like for this one I'll use the same one we had before.

Unable to find location now inside of else.

This is where things went well so we want to leave off the first argument to call back for that we are

gonna have to provide undefined.

Then as the second argument we can provide our forecast string.

Now we already have that string created in app dot J.

S Up above.

It starts right here in console dialog where we use response to get the summary.

It goes all the way to the end where we close the single quote right here.

I'm going to shift click to highlight everything in between and I'm just going to take that I'm going

to copy it to the clipboard scroll back down to the call and over in forecast dot J S we can paste it

right here between the comma and the closing parentheses.

I'm gonna paste it in and there we go.

We now have our four cached string getting sent back correctly.

Now the function is done and we already have a call in place so we can go ahead and file things off

in their current state to get the forecast.

This time it should not produce an error.

I'm gonna run node app dot J S and that is exactly what we end up getting.

Right here we have the data defined we have our summary with our temperature and percent chance of rain

and up above.

We have undefined for the error.

This is just a reminder that since you're using the weather stack API you'd see a similar forecast to

what you saw before it would start off with a description of the weather followed by the actual temperature

followed by the apparent feels like temperature.

Now let's go ahead and make sure that the error message shows up when it should.

The first thing I'm going to do is just do something like shut down my internet connection.

Right here I'll turn off Wi-Fi and then going to rerun the script and I do indeed get unable to connect

it to weather service which is great.

Let's go ahead and test that middle case by providing a bad coordinate value up above.

I'm going to bring myself back online and then I'm going to update either one or the other.

I'm gonna make this first value a string and all I'm gonna do is put a letter inside which is indeed

an invalid caught in a pair.

From here we can go ahead and rerun the script down below.

I'm gonna run things and what do I get.

I get unable to find a location which is fantastic.

Now we can remove the challenge comments and we can see how much easier our code got to use right here.

I have a call to geo code right here I have a call to forecast.

I could easily take these four lines move them into the callback and then do one thing before the next.

That is exactly what we're going to end up doing in the next video.

Now that we have these two functions in place it's gonna be easy to use them together and it's gonna

be easy to reuse them throughout our code should we need to.

All right I'm gonna wrap this video up by undoing that change I made I'll remove the letter A and remove

the quotes.

I'm gonna save the file and that's where we're gonna stop for this one up above.

Before we go we can actually also remove the old commented out forecast request leaving ourselves with

just 13 lines of code an app dot J S we can actually make that twelve because request actually isn't

being used in this file anymore which means we can remove that first line entirely bringing us down

to twelve.

All right I'll see you in the next one.

//CALLBACK CHAINING-------------------------------------------------------------------------
In this video you're going to learn how to use the callback chaining pattern with your asynchronous

note J S code.

So right now in app that J S we do indeed have two asynchronous I O operations.

The problem is that both are operating completely independently of the other.

We fire both OP and they each get their response and just dump it to the console.

That's actually not what we want with the callback chaining pattern.

We're gonna be able to do one thing then the next.

Which means we'll be able to geo code and address.

Then we can take the coordinates and use that as the input for some other asynchronous I O operation.

In this case we will pass the coordinates to forecast to get started.

We need to take our call to forecast and move it to where we have the geo coding output.

Where do we have that geo coding output in our callback function for geo code.

So what I'm going to do is take this forecast call and cut it out copying it to the clipboard then up

above I'm going to paste it right inside of the GEO code callback function.

Now what do we have.

Well we start with a call to geo code.

We start this asynchronous operation and when it's done we know that the event loop is going to make

sure our callback gets called from there.

We're gonna kick off another asynchronous IO operation then we're gonna wait for that callback to finish

and inside of here we'll have access to the final data.

So this is callback chaining.

We are chaining together multiple callbacks to do multiple things in a specific order.

Now what do we have to do.

Well we have to make sure that the data properties latitude and longitude get used as the input for

the forecast function.

Right here I'm gonna take our first argument where I have my static number and I'm going to remove that

and instead I'm going to get the property off of data up above.

So this is the success output from Geo code.

Now we know that data has latitude long to dude and we also added that other property location all of

which we could choose to use in this case we need the latitude property so data latitude as the first

argument to forecast now as the second argument to forecast we want to use the longitude.

So over here we're gonna go ahead and get that done.

I'm gonna remove these static.

No we have in place for that second argument and I'll replace it with data dot longitude.

Perfect.

Now that we have this in place the input for forecast comes from the output for geo code and the end

result is that we're going to get the weather for Boston because that's what's passed into geo code

up above.

Let's go ahead and make sure this actually works as expected.

Right here I'm going gonna save apt J S and down below.

We're gonna run the file so node app dot J.

S and what do we get.

We're gonna get two pieces of output and you'll notice that the geo coding information printed first

we got our data because things went well then down below we got our forecast because once again things

went well.

Now you'll notice something pretty suspicious.

It currently says it is negative 18 degrees and that's in Fahrenheit in Boston.

It's not.

It is mid November.

Clearly not that cold.

The problem here is that I've actually reversed the order of latitude and longitude so the latitude

comes second with the index of one and the longitude comes first with the index of zero.

So that's going to actually bring our application to a working state.

Sorry for the confusion there.

And now we get a temperature that makes a bit more sense.

I reran the program.

We still get our data printing but we can see these properties are reversed to the correct ones and

down below we get the forecast for Boston once again clear throughout the day.

But now it's about 40 degrees so above freezing as opposed to minus 18.

Now that we have the basics in place let's make sure we're still handling things like our errors.

So right here if something goes wrong with GEO code we want to make sure to use the error message in

some sort of way.

And we want to make sure we don't run the forecast call down below.

If something went wrong with GEO code we won't have the input necessary to actually run forecast.

So right here we're going to use a condition if there is an error do something.

What are we going to do for now.

We'll continue to print it.

Now the goal here is to print the error.

But the goal is to also not run the other code down here.

Now there are two ways we could get that done.

One is to toss on and else clots.

We put all of this code inside of else and we know that only one of the two will run.

Another approach worth noting is that you could just use return inside of here.

Return is going to stop the function execution after printing the error message to the console.

And this is a very common pattern.

So I'm going to use it here to give you a bit more exposure to it.

Now if there is an error the function stops and the error prints otherwise down below we continue on.

Now we don't need these console dot log calls.

The next thing we want to do if we do have data is to call forecast.

And that's exactly what we're currently doing.

Now we know that things can go wrong with forecast as well.

So let's go ahead and set up our if statement inside of there.

If something goes wrong with forecast once again I'll use return to stop this callback function and

I will just print the error message to the console so down below.

This is where we put the code that runs if both requests worked.

If we geo coded and we got the forecast we can put our final code right here.

And what are we going to do here.

Well the goal here is to print two things.

I want to print the location property from Geo code so people know what they're seeing the weather for

and I also want to obviously print the forecast which is the data that comes back from the forecast

function.

Both of those are going to print down below giving the user all of the information we were hoping to

provide.

Now the goal is to use the output from both geo code and forecast.

The problem though is that the argument name is the same for each.

So down below in our forecast callback function we're only ever gonna be able to access the data here.

The data here is going to shadow over data up above all we have to do to address that is to come up

with a unique name for one or both.

So right here I could call this something like forecast data.

Now I have data and forecast data there's unique names and I can access both.

Down below I'm going to remove those example console dot log calls we had before and we're going to

start by printing the location that is data dot location.

The last property from the geo code output that we have not used yet.

Then down below the location we're going to print the forecast.

So console dot log forecast data now that we have this in place we have a pretty good setup in the terminal.

We can run our application node space app dot and J.

S and if I fire that command off what do I get I get my location information followed by my forecast.

Now here I can see which Boston I'm looking for.

So if I was looking for a Boston in a different state or a different country I would know that I'm not

actually getting the weather for what I intended to get the weather for and I could refine my search

result even more to get a different Boston.

So after the location we have the forecast once again still clear throughout the day with a temperature

of thirty nine point five five degrees and a zero percent chance of rain.

So this is the final output we're going gonna have if things go as they were supposed to.

The only thing left to do is to make sure that the user can actually provide the location without needing

to modify the source code.

So we want to get this value which is currently hardcoded in as a command line argument.

Getting that done is going to be your challenge for the video and down below I have some challenged

comments outlining what I'd like you to do.

The big picture goal except a location via a command line argument.

Now you're going to access this single value without using any module like yards.

You can use the standard functionality we explored on process and that was the second video of Section

3.

So if you forget exactly how that worked.

That's OK.

Go back to the video to jog your memory or use the PDA guide.

Then you can actually integrate it into the app here.

Now once you have the argument you're going to use that string as the input for geo code.

So instead of having these static String Boston you'll reference the value the user provided.

Now you're obviously only going to do that if a location was provided.

If you're not seeing any argument provided you can go ahead and print a message saying something like

please provide an address and then you would not run geo code and you could just use and else and an

if statement to get that done.

Now the last thing is to test your work with a couple of locations.

And this I will give you so down below it's going to look a bit like that snowed app dot J S there's

not going to be anything fancy we're just going to provide the location right here.

So if I wanted to search for Boston it would look like this.

Now if I wanted to search for a search query that had two words I would have to put those in double

quotes like new space York.

So you want to make sure that both of these work and in the end of the day you're going to get this

and this as the first argument value.

So take some time to refer back to what we covered quite some time ago and use it in the application

here.

When you're done test with those two locations and make sure you get what at least look like accurate

temperatures.

All right take some time to knock that out and when you're done come back and click play.

How would you do to get this done.

You needed to use the ARG the property on process which we explored earlier.

So if I just dump that to the console we can see what we get when we run commands like these process

dot arg.

I'm going to save the program down below I'm going to rerun one of those commands and we can see what's

on that ARG.

The variable right here as we talked about earlier the third value is the first thing we provided the

first thing is the path to the node executable.

The second thing is the path to the script we ran.

And the third is in this case New York or in the case of the other command Boston.

That is what we want.

So right here you could have created a variable like address setting it equal to a process dot ARG v

accessing the third item with the index of 2.

So now we have access to the command line argument and we want to use it as the input for geo code down

below.

So instead of the static String Boston I'm going to grab whatever value is stored on the address variable.

Now this doesn't account for if no location was provided but for the moment we can at least test things

out down below.

I'm going to rerun the exact same command using New York as my search term.

If I run it what do I get.

I get New York New York in the United States and I get the temperature for that.

Now I could run a different location node app J S Philadelphia I don't have to put it in quotes because

it's just a single word.

And if I fire that off I get the weather for where I'm currently in filming this video.

So now that we have that in place we want to make sure we only geo code if an address is provided.

Otherwise we'll print some sort of little string that's going to be what needs to happen for step three.

And we could get that done with an if statement.

So right here if there is no address what are we going to do.

Console log please provide an address otherwise inside of an else clause.

We're gonna go ahead and run the code.

We had down below so I'll take my geo code call from beginning all the way to end.

I'm going to cut it out of its current location and I'm going to paste it right inside of else.

So that takes care of steps one two and three.

Now we're just going to test our work and make sure we do get the error message when no address is provided.

I'm going to remove the challenge comments as well as a couple of those extra lines and I'm going to

test things out so down below.

Let's run it node space app dot J s when I do that I would expect to see.

Please provide an address and that is exactly what I get now node app dot J S Dublin.

I'm gonna fire that off and this time we do indeed get a valid location.

Dublin Ireland and I do indeed get the temperature for that.

Now if I was looking for a different Dublin I could be more specific inside of quotes like Dublin P.A..

That's where I grew up and if I fire that off now I'm getting Dublin in Pennsylvania in the United States.

With that in place the challenge is all done.

Now there are plenty of ways you could have solved this.

You might not have used the exact same setup and that is a ok as long as you're getting similar results

for those commands.

That's where we're going to stop for this one.

I'm excited to continue on in the next video so let's go ahead and jump right in.

ES6 ASIDE: OBJECT PROPERTY SHORTHAND AND DESTRUCTURING--------------------------------------------------
In this video we're going to talk about a couple of iOS 6 features that make it much easier to work

with objects when it comes to creating objects.

And when it comes to accessing properties on an object then we'll take what we learned and we'll actually

integrate it into the weather application to improve it.

But to kick things off let's go ahead and create a brand new file in the playground directory.

I'm gonna make a new one starting with the number five and we're gonna call this five a hyphen.

Yes six objects dot J S in here we're going to mess around with two new features then we'll take what

we learned and integrate it into the weather app and that'll be your challenge for the video.

Let's get started with the easier of the two features which is the object of property shorthand.

This allows us to add values onto an object with a shorthand syntax under certain conditions.

So to kick things off and explore how this is going to work let's make two variables.

I'm going to create a const name and I'm going to store my first name.

Now for this example the variable names are important.

So make sure to use the same ones I use.

Next up we're going to create a constant called user age and I'm gonna set that equal to my age.

Now from here the goal is to create a user object.

So we're gonna set that object up.

We want their name and age coming from these variables.

And I want to store their location which I'll just set up right inside of the object definition.

So name comes from the name variable then age comes from the user age variable.

And finally location comes from an inline string.

So right here I'll just to find my current location.

Philadelphia.

Now we have an object and we could print that to the console and we wouldn't get any surprises.

So right here console dot log user I'm going to save the program and run it just to make sure things

are working so far at this point we are not taking advantage of the new syntax down below in the terminal.

I'll use these dot dot forward slash playground to switch into that directory from here I'll clear the

terminal output and run my new script that's going gonna be node 5 hyphen yes 6 hyphen objects dot J

S and when I run it what do I see.

I see my object with those three properties name age and location with the correct value for each.

Now let's talk about the object property shorthand syntax this syntax can be used when defining an object

like we're doing here it comes into play when we're setting up a property whose value comes from a variable

of the same name and that is exactly what we do here we're setting up a name property the value comes

from a variable with the same name and that means we can actually use the shorthand syntax.

So what do we do.

We remove the colon and we remove the variable name leaving one just looks like the property name but

this is actually a shorthand syntax.

When we do this it's going to create a name property on user whose value comes from the value of the

name variable.

So in this case we are going to get the exact same result we got before.

Down below I can save the file with the new syntax in place and run the script.

What do I get.

I get the exact same thing showing up.

Now it's important to note that the names need to match up exactly.

So we have age right here.

But its value comes from the user age variable.

That means we're not gonna be able to take advantage of the shorthand syntax like this because there

is no age variable defined.

If I do try to use this we're gonna get an error when we run the script down below I can run the program

in its current state.

And what do I get.

I get a reference error.

Age is not defined and they're right there is no age variable.

So when we do want to create a property whose value comes from a variable of a different name we still

have to list that out.

But here we can use these shorthand syntax because the property name we're trying to create does match

up with that variable name.

Now this is not an earth shattering feature that's going to make your programs faster or more scalable

but it is a very nice syntax improvement.

And I'd take advantage of it constantly and there are a few places in our code where we can take advantage

of it as well before we worry about integrating this into our code.

Let's go ahead and explore the other feature which is going to take a bit more time.

This is known as object D structuring now object D structuring is useful when you have an object and

you're trying to access properties from it.

So let's start by creating an object we can work with.

Let's get started by defining the object we're going to d structure.

So right here const a product equals we're gonna set up an object and we could say this is an object

for a fictitious inventory system let's say for our store we have a label for each product which is

shown on the shelf below the product.

I could call this one something like red notebook and from there we'll add a couple of other properties

into the mix I'll add price.

Let's say this notebook is three bucks I'll add these stock we can say we have two hundred and one in

stock.

And finally I'll add something like sale price and we'll say that the item is currently not on sale

by setting the sale price property equal to undefined.

Now from here we can go ahead and use de structuring the whole goal of D structuring is to extract object

properties end their values into individual variables so instead of a product price of property I could

have a price variable with the value of three or instead of a label property on product I could get

access to a label variable with the value red notebook.

This is really useful especially when you're working with complex objects that have a lot of properties

you're constantly referencing.

It's nice to have those standalone variables that you can easily use we can achieve the same behavior

without a new syntax by simply creating individual variables like a concert label whose value comes

from product label and we could do the same thing for something else like a concept stock whose value

comes from product dot stock.

Now we have a label and stock variable we can access throughout the rest of the program without having

to grab it off of the object each and every time we want to use it.

Now the problem with this obviously is that we end up writing a lot of code for each one.

We want to extract.

So we're gonna have multiple lines to pull off multiple values with dy structuring.

We get an improved syntax so I'm going to comment out those two lines and down below we'll explore the

deep structuring syntax.

Now I'll admit it's gonna be a bit weird at first but I promise you'll get comfortable with it as we

use it more and more throughout the class.

So to start we are indeed still trying to create new variables.

So I am going to set up const and in this case we are going to after const add a pair of curly braces

we'll talk about what goes inside of there in just a second.

After that we are going to set it equal to and this is where we put the object we're trying to D structure.

In this case I'm trying to pull values off of product so I'm going to reference it right there.

Now let's do the same thing we did above.

Instead of accessing product out label and product dot stock I want an individual label and stock a

variable to get that done inside of the curly braces we list out all of the properties we're trying

to extract.

So that would be a label comma followed by the next one which would be stock.

Now the space in between is completely optional.

I typically add a space when I'm working with D structuring and now what do we have we have individual

label and stock variables which we can use down below.

And to prove it we're going to log them.

So console dot log label followed by console dot log to print these stack.

And if we run the program we're gonna see that we do indeed get red notebook followed by two hundred

and one down below.

I am going to rerun the program using the up arrow key and enter and when I do I get the two values

that I just mentioned we would get.

So with the D structuring syntax it makes it really easy to extract properties off of an object creating

individual variables that store those property values.

So in this case we are pulling a label property off of product.

We are getting its value and we are creating a new label variable and we're doing the same thing with

stock.

We're creating a new stock variable whose value comes from the stock property on product.

When you are de structuring you can grab as many things as you want by listing them out in a comma separated

list inside of these curly braces.

And that could include properties that don't exist on the object at all like rating maybe I'm storing

a star rating for each product.

There is no property defined up above.

So what are we going to get as the rating variable.

Well we're going to get undefined down below.

Consult dot log if I print that new rating variable.

The program isn't going to crash because there's no property rating.

It's just going to store undefined and that's exactly what we can see down below.

Now there are two other nice things we can do with D structuring.

One is that we can rename the variable we end up creating.

So let's say that I want to create a label variable but instead of calling a label I want to call it

something like product label.

But obviously I'm still trying to get it from the label property on product.

To do this we use the following syntax.

We list out the property that we're trying to grab followed by a colon followed by the new name.

So in this case product label would be the new name we want to create.

So this is going to create a new constant called product label.

Who gets its value from the product label property.

Now let's go ahead and test this out.

If I run the program in its current state it's going to fail.

There is no longer a label variable defined.

We have renamed that product label.

If I reference product label we're gonna see this time around that things will indeed work.

I'm going to rerun the program and now we are correctly seeing red notebook print.

So being able to rename the variable we create D structuring can be really handy especially if that

name happens to be already taken maybe as an example.

We already have a label variable up above and the program and we can't use that down here but we still

want to take advantage of D structuring.

One last little feature we get when using D structuring is the ability to set up a default value for

the variable should the object not have that property.

We could do this for a label or stock or rating to explore this let's do it for a rating since there

is no rating property up above.

Right here we just say rating equals followed by a value.

Let's say if there is no rating property we will use the number five as a five star rating.

Now if I run the program we're going to see five print.

It's important to note that this default will only be used if there is no property matching on product.

If there is the default won't be used.

So for example if I set up a rating let's set it equal to four point two stars up above.

Now that value is going to be used instead of the default we can save the program.

We can rerun things and that is exactly what we end up seeing below.

Now we can also use these structuring when we're working with function arguments.

That's the last thing we're going to cover before we move on to the challenge where you're going to

use these two tools in the weather application.

Right here I'm going to comment out all of the code we have for D structuring and we're going to create

a function that takes in that product object.

So right here.

Let's go ahead and create a function.

I'm going to create something like const I'll call this transaction and we're gonna set it equal to

a function and this function is going to expect two arguments.

Let's say there's a transaction type am I selling a product or am I placing an order.

Let's say we also need to know the information about the product that we are making this transaction

with.

So I'll call this something like my product.

Now we can pass that value in to transaction using a very basic syntax transaction calling it with those

two arguments.

Let's just use these string order as the first argument and then we'll pass in our object as the second

so right here we have an object as the value for my product.

Now if we wanted to distract your values off of that we could just add a line down below cost inside

of curly braces equals my product and I could d structure something like the label that would indeed

work as expected.

Now we have a local label variable we can use but we can actually take things one step further and d

structure the argument right here in the arguments list.

So instead of giving a name for that argument we simply set up the curly braces and now we can d structure

whatever we want off of that variable without ever having access to the whole thing.

So right here we're gonna have access to just the values we choose to D structure.

I could for example D structure label and our destruction or something else like these stock to values

that might be important when making an order.

And down below we can use them.

So console dialogue I'll just print out the type followed by the label followed by the stock just to

make sure all of those variables actually exist.

If I run the program down below.

What do I see.

I see the order type.

I see my label and I see these stock printing all getting their values correctly assigned.

So when we're using D structuring we can d structure a standard object outside of the arguments for

a function using the syntax up above.

If we know that an argument is an object though we can always d structure it right in line.

Both are perfectly valid and we'll end up using both throughout the course.

That's where we're gonna stop for this one now that we know how to use the property shorthand syntax

and object D structuring in the next video it's going to be up to you to use both in the weather application.

I'm excited to get to that challenge video so let's go ahead and jump right in to the next one.

//DESTRUCTURING AND PROPERTY SHORTHAND CHALLENGE-----------------------------------------------------------
In this video it's going to be up to you to use the object properties shorthand and d structuring which

we covered in the last video inside of the weather application.

Now to start I'm going to take our D structuring and object property shorthand playground file and I'll

move that off to the right hand side.

So we have all of our weather app scripts side by side over here and from the terminal.

I am going to switch back into the weather app directory since we'll be running that application.

In this lesson so S.D. dot dot forward slash weather hyphen app.

Now once we're here the goal is to figure out what exactly we're supposed to do and as always with challenges.

I have a set of challenged comments describing what I'd like you to get done.

The big picture goal is to use both the destruction thing and the property shorthand syntax inside of

the weather application.

First up you're going to use de structuring an apt J S forecast to dot J.S. and geo code dot J S all

three of these have an instance where we're using properties from an object that we could just d structure

instead.

Down below we grab things off of data those properties could be d structured into individual variables

in forecast.

J ust end in geo coded dot J S the only thing we ever use off of the response object is body that could

be destruction as well.

From there we can talk about using the property shorthand syntax.

This can be used in forecast J Yes and in geo code J S in both files we set up the options object we

pass to request and we could use that syntax in there.

So take some time to knock out all of those re factors in the files listed for each.

Then when you're done test your work so make sure you can still run the application and get the expected

weather output.

All right.

Pause the video knock that out and when you're done come back and click play

how'd that go.

I'm going to kick things off with app dot J S now in here we can use d structuring but there is no use

case for the object property shorthand syntax and that's OK down below geo code has its callback called

with two arguments The first is error which is a string and the second is data and we know that data

is an object we use three properties from it latitude longitude and location we're gonna go ahead and

destructor those instead of accessing them off of data up above we have data I'm gonna remove that and

we are going to d structure the second argument passed to the callback right here we are gonna grab

three things from it first up we have latitude then we're gonna have longitude and finally we're gonna

have location this is Andrew from the future with a quick update as a couple of students correctly pointed

out there is a small problem with the line of code that we just wrote and you can see that line of code

under existing code right up top.

Now the problem is something you'll only run into if you end up calling geo code and an error occurs

if you call geo code and you do indeed get back the latitude long to 2D and location things will still

work just fine.

Now this is a legitimate error but it is something that I plan to cover later in the class.

So all of the stuff we're going to talk about right here it is covered in much more detail in the fourth

lesson of Section 8.

Now if you run into the problem between now and then you might think your application is broken.

So I'll take a quick moment to talk about b code change will end up making.

So you can put it in place right now then in the fourth lesson of Section 8.

We'll end up talking about this in greater detail.

Let's start by exploring the problem by talking about the existing code right up top.

So if we call a geo code and there's no error things go well we do get our object as the second argument

to the callback we do structure latitude longitude and location and we will be able to use those in

our function down below.

The problem that we're going to talk about comes up if you call geo code and an error occurs.

So if an error occurs the callback is only called with that first argument the error no value is provided

for the second argument and we know that if we call a function and no value is provided for an argument

the default value is undefined.

So long story short if we call geo code and an error occurs what we end up doing is trying to destructor

off of undefined which is going to throw an error.

We could only de structure off of an object.

So now that we've explored the problem let's talk about the solution briefly.

Let's get started by talking about the code at the very bottom.

So at the very bottom we are using the iOS 6 default function parameters syntax.

This is the new feature of JavaScript.

We'll talk about in detail in Section 8.

Lesson 4 but let's briefly touch on it here just so we can understand the change will make to that one

line of code.

So down below we set up a pretty standard function called great it takes in the user's name and it prints

on message using console dot log.

So if the name was Mike it would print yellow followed by Mike followed by an exclamation mark.

Now what if we call green with no name.

In that case we would get something like Hello undefined.

So what if we wanted to provide a good value for name.

If no name is provided when the function is called we can do that using the default function parameters

syntax.

So I've added a red underline under the new code that uses this feature.

So right there inside of parentheses I call my first argument name.

Then I ad space equals space followed by the string user.

So that is the new syntax.

This says if we have a value for the first argument go ahead and use that value.

If we don't have a value for that first argument go ahead and use the string user.

So we can see this in action in our two function calls.

Down below when I call greet and I pass in Andrew I see.

Hello Andrew.

When I call greet and I don't pass in any arguments I see Hello user.

So it falls back to the default.

Now you could run this code in your application to see this in action.

And as mentioned we'll cover this in a way more detail later but that's a quick idea of what we can

do with the iOS 6 default function parameters.

Now let's talk about how we'll end up changing that one line of code.

So up top we have our existing code that we just wrote in the middle.

We have the new code with a few characters added and I've underlined those in red.

So right there we are using the default function parameters syntax to set up a default value for that

second parameter.

So if a value is provided we'll use it.

If no value is provided the default of an empty object has been configured.

So now let's explore the two scenarios when geo code runs successfully and when geo code fails.

So if geo code runs successfully we'll end up calling our callback with a value for the second argument.

If we provide a value then our default won't be used.

So we'll deal structure all of the data that we got back from the API and we'll be able to use that

in the function down below.

That was never the problem.

The problem is if we got an error.

So if we call geo code and an error occurs the callback is called with just the first argument in that

case.

The second argument would not be provided and our default of an empty object would be used.

So from there we would end up de structuring latitude longitude and location off of that empty object.

And that's fine.

That is perfectly valid.

The value for all three will be undefined.

So the program won't crash we will just get undefined for those three values which is fine because we're

never going to use them if the error exists.

So that's their brief change we need to make.

And once again you might have been able to go through the class without ever running into this before

I explained it but a few students were they were confused.

And my goal is to create a class that's seamless that works from beginning to end without problems.

So right here I just wanted to jump in with an exclamation excuse me with an explanation and we'll go

back and talk about all of this in more detail in the future.

So sorry for that quite long transgression but now that we can understand the change we need to make

and what it does.

Let's add that change to our code then we'll jump back in to the regular lesson now at this point our

program is broken because we're still using that data variable but it no longer exists.

We're going to remove data and Dot in all three locations.

Now we're just referencing latitude which is indeed defined.

We're just referencing longitude from up above and down below referencing location.

Now that we have this in place we can actually test our work but more before moving on to the other

files.

It's always a good idea to test your work as you refactor.

So instead of getting to the end and having a bunch of different files that could have caused the error

it's easier to isolate the problem.

If you run the program multiple times.

So node app dot J S if this works with a search term like Philadelphia then we know our refactoring

here is good.

If it doesn't work we know that it must just be the changes we made to this particular file making it

easier to figure out what went wrong.

Now let's move on to the other files forecast.

J.S. and geo code dot J.S. both which can use de structuring and that shorthand syntax over in forecast

J S we can use these shorthand syntax in the object we pass to request instead of referencing you are

L variable to get the U R L property we can use these shorthand syntax which does the exact same thing.

This is still setting up a U R L property whose value comes from the variable up above because the names

are identical.

Now we can also use a little bit of distraction.

Down below we have error and we have response we know response is an object but the only property we're

ever using off of it is body.

So we could just de structure that.

I'll remove the response argument set up my curly braces and list out body right here down below.

We can now remove any use cases of response replacing them with just the call to bodies.

So right here instead of response dot body dot error.

I have body dot error and I'll remove response dot down below I have it three times as we generate the

forecast and I'll remove it in all three.

Now we are just referencing body which does indeed exist as a standalone variable because we do structured

it up above.

Last up we can move to geo coded dot J S which is very similar to the forecast file I can use the shorthand

syntax right here once again when setting up the U R L and once again I can d structure a body off of

response.

Now there are four situations where we used response before.

Once you write here to fetch the length of the features array that's gonna be just body dot features

dot length now and down below we used it for each of these three property values.

So I'm gonna take all three I'm gonna remove response dot accessing just dead body object.

Now that we have this in place we've done all the refactoring that is steps one and two and we're going

to move on to step three and actually test things out for a final time.

So down below from the terminal.

Let's go ahead and rerun the program right here.

What do I get.

I get my forecast.

Still printing it is for the correct location.

Philadelphia Pennsylvania.

In the United States.

And I have my forecast rain in the morning.

Yep it is indeed raining outside.

It's currently a bit chilly with a zero percent chance of rain.

As we continue through the day now that we have this in place we are all done and that is the introduction

to yes six D structuring and the object property shorthand we're going to use both of these extensively

throughout the class.

Now that we know about them.

Sure there are other situations where we could have used these in notes dot J S but we'll just continue

to use these features going forward instead speaking of going forward.

Let's go ahead and jump right in to the next video.

BONUS: HTTP REQUESTS WITHOUT A LIBRARY ----------------------------------------------------------------------------- 

 In this video as promised earlier in the section you're going to learn how to make HDTV requests to

a given U.R.L. without using the request NPM library.

Request is just an NPM library and NPM libraries can't do anything that you could do with node anyways.

Typically they just make it easier to do.

And we saw that with yards and request.

You don't need those to work with command line arguments or to make HDTV requests but it sure does make

the process a whole lot easier.

Now in this video we're going to explore how we can make requests using the modules that node provides.

This is a completely optional video as we're not going to integrate what we learn here into the weather

application.

Instead we're going to just explore it over in the playground directory so we can get a better feel

for what exactly the request module is doing to do this.

Let's make a brand new file.

I'll call this six hyphen raw hyphen HDTV dot J as and in here we're going to essentially recreate one

of our TTP requests firing off the request to the server getting and passing the response and doing

something meaningful with it to get this done.

There are two core modules that we're going to explore we can find those by cracking open the node j

asked documentation in the browser I'm going to close the map box and dark sky API tabs since we're

done with those and I'm going to open up node j s dot org to explore the docs.

Once we're here we're gonna go to the documentation page and we're gonna go to the docs for our version.

Now here we have the table of contents which we've used before.

For example we explored the file system module earlier in the class in this video.

We're gonna take a peek at HDTV and H TTP s.

Now already we can see a bit of an annoyance.

There are separate modules depending on the protocol we're using with request the NPM library.

That's not necessary in abstracts all of that behind the scenes allowing us to easily switch out the

protocol we're using without needing to load in a completely separate library.

Now if we crack both open which I will in a new tab we can take a quick moment to explore them before

using them in our code.

Now both of these modules can be used for both pieces to the puzzle.

You can use these libraries to create a new server and we'll talk about server creation a bit later

in the class and you can also use these modules to make requests to an existing server and that's what

we're going to focus on in this video.

As we scroll down through the table of contents for each near the bottom we're gonna see a couple of

methods and the method we're looking for is request now.

Right here we can use request with options or a U.R.L. with optional options.

Either way it gets the job done and we're gonna see the exact same thing for the H TTP s module if I

scroll down we have those two ways.

That request can be called so we use the TTP module for standard requests and we use H TTP as if we're

making a request to a secure server.

Now in this case both of our API eyes do use the H TTP s protocol.

So that's what we're gonna go ahead and use as well.

Now since it is a core module as a reminder there is no need to install it.

We can simply load it in const H TTP S equals we're going to require the H TTP s core module.

And once again the name I'm choosing to provide here comes from the documentation.

If we scroll down to where we get to some examples you're gonna see that when they load it in.

They use the H TTP s variable name as a standard.

Now it's time to actually use the request function to fire off a request.

In this case let's go ahead and get the forecast for a location.

Though you could also use the same technique to geo code or interact with any other API.

The first thing we need is a U R L to make the request too.

So I'm gonna grab the forecast you are.

All we had in forecast dot J S I'm gonna take the u are all variable in its entirety with the contents

as well.

I'm gonna copy the entire line and bring it over to our new file and paste it in.

Now we are referencing variables which no longer exist so we can remove all of those.

I'm gonna remove the latitude the comma and the longitude and others replace that with some static inline

values.

For example I can used forty comma minus seventy five which is pretty close to where I am.

Not exact but it's good enough for this example.

This is Andrew with a quick reminder that you should be using the new weather stack U.R.L. that you

already had in place.

So up top I have the old dark sky U.R.L. which I just added to the file down below.

We have the new weather stack U.R.L. which is the one you'll end up using.

Now right here I did remove the references to the latitude and longitude variables.

I have set query equal to forty five comma minus seventy five.

So this is the U.R.L. you'll end up using.

And remember that later on when we explore the response you'll end up seeing the response from weather

stack which we've already looked at where we have the current property with our weather data.

All right let's jump back in to the less it down below.

It's now time to fire off the request and we start that process with H TTP s dot request.

This is a function so we're gonna call it as such and we pass to it to arguments.

The first is are you are L which we have access to the.

That you are all variable.

And the second is a callback function and this callback function gets called.

With the response.

This is one last quick update for the lesson.

Remember with whether stack we're using an H TTP U.R.L. since H TTP yes is a paid feature.

So instead of using the TTP s core module like we're doing up above we'll be using the TTP core module

like we're doing down below.

So down below you can see that for the new weather stack code I've called the constant on line 1 h TTP

and I am requiring the TTP module down there online for you'll also see that I'm calling H TTP dot request

instead of h TTP s dot request.

So these are the only changes we need to make.

Just change those three instances from H TTP s over to H TTP and you'll be good to go no other changes

required throughout the rest of the lesson.

All right let's jump back in.

Now the callback we use here is going to be very different from the callback we're used to.

Like we had in the forecast or geo code file our core node modules typically operate at a lower level.

Well NPM modules like request abstract away a lot of that complexity.

Since we are using the core node module here we're gonna have to setup things that you might not think

should be necessary.

For example in this callback we don't have access to the complete response body.

Instead we can go ahead and grab the individual chunks that come through because HDTV data could be

streamed in multiple parts.

So right here what does that mean for us.

It means we have to listen for these individual chunks to come in and we also have to listen for when

all chunks have arrived and the request is done right here.

We can start this process by using response dot on response dot on is a function and it allows us to

register a handler.

Now there are a few different events we can register callback functions for one of them is data and

we provide the event name as the first argument represented as a string.

Now from here we can also provide the callback and that's going to fire when new data comes in and we

get access to that data.

The first and only argument commonly called Chuck so this is a chunk of the response it might be the

entire thing or it might not depending on exactly how the server has been set up.

Now the other thing we're going to need to do in here is figure out when we're done and we can do that

using another call to response dot on.

Here we are waiting for the end event when things are over.

This callback function is going to run and it doesn't get any arguments.

Instead by running we just know we're done.

So now it's time to put these two together to figure out how we can get the entire response body pass

it from Jason to a javascript object and actually use it.

So as I mentioned this callback is going to fire when data comes in.

Now this could happen one time or it could happen multiple times.

Either way we need to take this chunk.

We need to add it somewhere where we can store it until we have all of them then we can pass it as Jason

to up above.

Let's get that done by creating a new variable.

Let data equal an empty string.

So here I'm using left instead of const since I am going to reassign the value over time changing the

string.

Now inside of this callback we're gonna have access to that new chunk.

Let's go ahead and see what the chunk looks like.

By console logging it.

So console dot log chunk.

Now you'll notice that the program in its current state is actually never gonna run that code.

Let's go ahead and prove it.

See dot dot forward slash playground to get into that folder I'll use clear to clear the terminal output

and I'll run our script.

That's these six raw HDTV J.S. file.

Now when I run this things are just gonna Hey it's not going to print our message and it's not going

to bring us back to the terminal for us to run another command.

Instead it's stuck it's stuck because we don't have a complete request.

There's another method we need to use to say we're actually ready to send this off to do that we have

to make a change to our program what we get back from the request method is what you could refer to

as the request itself so constant request can store this variable the variable that comes back as the

return value from request now on here there's a method we can use to kick things off that is request

dot.

And so right here are just another example of how the low level API might not give us the exact tools

we were hoping to it can get a bit confusing even with a simple example there's a lot going on here

with very little progress.

Now we can take things back to the terminal and rerun things by calling and it's going to see that we're

done setting up our request and it will actually fire it off if I do this what do I see.

I can see that right here we have a few different console dot log calls printing various buffers three

of them to the screen.

So these chunk data that comes back is indeed a buffer.

We want a string.

So we're going to go ahead and convert the buffer to the string using the two string method as we've

done earlier in the class and we're going to add the data on to the data variable.

So data is going to equal the old value for data plus the new chunk.

So chunk dot right here to string to convert the buffer to a string.

Now that we have this in place we're gonna have access to the entire value the entire body response

in the data variable down below in end we can go ahead and access it console dot log data.

Now the data callback ran multiple times once for each chunk and is going to run a single time once

things are done down below in the terminal.

I'm going to rerun the program again.

And what do we get.

We get one thing printing to the screen.

It has a very long string.

This is our Jason data.

So from here we could go ahead and pass it to get an object that we could actually pull properties off.

So let's go ahead and get that done.

Const I'll call this something like response body or a body equals.

I will use Jason pass to pass a Jason string which I have stored in the data variable.

Then I'll just print body console dot log body.

Now if I save things and rerun the program from the terminal.

Once again we're gonna see that instead of getting the long string we get our past object ivory around

the program and right here our object prints and we could use this to grab the current temperature or

grab the forecast for the next minutes days or hours.

So this is what it takes to make a request with the core H TTP and H TTP s module and we're not even

really done yet because we don't have any error handling set up.

Let's go ahead and wrap the video up by seeing how you could get that done just up above between where

we fire off their request and use end to actually send it.

We're gonna use request dot on to set up a another listener.

Now the event we're listening for here is error.

This is going to get fired when an error occurs and our callback function which we provide is going

to allow us to do something with that error.

Now the error is the first and only argument and so we can go ahead and name it.

And from here we could do whatever we needed to do with it.

Now in our other files we used a bit of error handling to print one of two messages.

In this case let's go ahead and just dump it to make sure this is even running.

So console dot log in error then as the second argument will actually dump it to the console.

Now with this in place we can go ahead and run the program generating an error to do that.

We can do something simple like turn off our network connectivity.

I'm going to disable Wi-Fi on my machine.

Then down below I'm going to rerun the program and what do I get.

I get the error message looking exactly like what we had much earlier in the class when we initially

explored the error in request.

So now that we have this in place we have a very basic HDTV s request with the core node module.

As you can see this does provide you everything you need but at a much lower level than you probably

expected.

That's why in this class and in the real world people are making requests with those core modules instead

they're using libraries like request access shows or others to make the request process much easier.

Here are callback gets fired a single time when things are ready we either have the error or we have

the response and the body is already sitting there.

We don't have to do anything with it like concatenate together the individual chunks to get everything

we need.

Now you might be thinking why does it no just change how those core modules work to be easier to use

and look a little bit more like a library such as a request.

And that's missing the point.

The core node modules are supposed to provide those low level implementations and Node comes bundled

with NPM because you're supposed to be using NPM modules when you're building out your applications.

That's where we're gonna stop for this bonus video.

We took a dive into exactly how we could use the core node modules to make requests and we've learned

a little bit more about why NPM libraries like request are so valuable to the node ecosystem.

That is it for this video and that is it for this section in this section.

We learned all about a synchronous node j s as we built out our little weather application.

I'm excited to get to the next section.

The section introduction is coming up next.

So let's jump right in.

//WEB SERVERS(SECTION INTRO)------------------------------------------------------------------------------
Welcome to section number seven on web servers.

So far in the class all of the applications we've created have only been accessible via the command

line.

Now that is a great way to get started but it's not realistic for users.

It would be much better if a user could simply Type A you are all in the browser to pull up and interact

with our applications.

And that is exactly what we're going to start to work towards in this section in this section you'll

be learning about one of the most popular NPM libraries out there.

That is Express Express makes it really easy to create web servers with note these servers are going

to allow us to serve up all of the assets for our web application.

This includes H2 UML we're going to render to the screen see SS to style our application and client

side JavaScript so we can set up all sorts of awesome user interaction now using Express.

We're also going to be able to serve up Jason data.

That's what's going to allow us to get the location from the user convert it into a forecast and then

send the forecast back to the browser to have it rendered to the screen.

Now that's a lot of stuff but don't worry as always we're going to cover all of that in detail step

by step.

Now most courses start here with express but I think that's a rough way to go getting started with the

fundamentals of node is important.

Otherwise it can be hard to differentiate between what is node and what is Express.

Now that you're already familiar with the fundamentals of node it's going gonna be so much easier to

learn and master Express.

Let's go ahead and jump right in.

//HELLO EXPRESS----------------------------------------------------------------------------
In this video you're going to create and run your very first node j s based server.

This is going to offer users an entirely new way to interact with your applications instead of needing

to run commands from the terminal to interact with your app.

They'll be able to visit a U R L and by the end of this video you're gonna have a you are well you can

visit in the browser to interact with your node j s application with the node server we can serve up

whatever our application needs.

So imagine I'm trying to create a portfolio Web site to show off my work.

I can create a node server that serves up all of the assets the browser would need to load.

This would include H TMF documents CSA s files to style the page client side JavaScript and maybe some

images of my work.

Now we could also take the other approach with the server and instead of serving up a Web site we could

serve up an HDTV Jason based API.

That would be similar to the map box or the dark sky API where we're exchanging Jason data back and

forth with the server.

Now we are going to explore both approaches throughout the class.

We're going to start off by creating simple web servers.

Then once we're comfortable with that we're going to move on to create TTP based API as with database

storage authentication email sending and more.

As mentioned in the section introduction the tool we're going to use to create our node servers is the

very popular express library.

You can find Express on the Web over at Express J S dot com Express is one of the original NPM packages

and it's one of my favorite express definitely helped put no JSA on the map back in the day because

it made it so easy to create web servers whether you wanted to serve up something like a static web

site or whether you wanted to create a complex HDTV Jason based API to serve as the back end for something

like a mobile or web application.

Now we're gonna use Express extensively throughout the class but I wanted to take a moment to show you

where you can find it on the Web so you know where you can go to learn more.

They have a great getting started guide that will cover all of this.

In the class they also have a guide for doing more complex and advanced things which will also cover.

And finally they have a great API reference which serves as the low level documentation for every single

method and tool available.

Now in this video in particular the goal is to get a basic server up and running.

I want to be able to pull up a you are well in the browser and see an asset that my server served up

and that is exactly what we're going to do right now to do this.

We're going to create a brand new directory so let's head over to visual studio code.

I'm going to close all open files collapse all open directories and we're gonna make a brand new one

inside of the node course folder.

Right here we can call this something like web server.

Perfect.

And now we're going to install and use Express inside of the terminal.

Let's take a quick moment to navigate into our new directory.

That would be C D web server since I'm currently inside of the node course directory.

And once I'm in the web server folder we need to initialize NPM so we can actually install Express which

is indeed an NPM module.

So right here I'm going to use NPM in it.

Now we could just run this and then fill out the individual fields for package.

Jason as mentioned earlier though we can just use the Y flag which is just going to answer yes using

the default value for each question.

And that's perfectly fine since we were gonna use the defaults anyways.

I run the command and what do I get.

I get a package dot Jason File now that we have this in place we can install the Express library.

That would be NPM I express at the latest version which is four point sixteen point four.

I'm gonna run the installer and once that's done we can focus on actually creating a no J Yes script

that will create configure and start up the server.

Now I'm gonna do this in a brand new directory so in the web server folder I'm going to create a sub

directory called Source or S.R. C for short.

And this is where we're gonna end up putting all of our node J.S. scripts.

So instead of having them in the root of the project like we did with the notes app and with the weather

app we're gonna go ahead and keep things a bit more organized so I can show you how to create a more

complex directory structure that's going to scale a little better as your application starts to grow.

So as things get more complex it's gonna be more important to stay organized.

Now that we have things in place let's go ahead and clear the terminal output down below and create

a single file in the source folder.

This is going to be the starting point to our node Apple ocean and I'm going to call this app dot J.

S in here we're going to load in Express configure it to serve something up and then we're gonna start

the server to get started let's create a new constant so we can load the library in I'm going to create

a constant Express and I'll use require to grab the library exports and what the Express library exposes

is just a single function so express is actually a function as opposed to something like an object and

we call it to create a new express application and that is exactly what we're gonna do.

Just a single time right below right here.

Let's create a new variable to store our Express application.

I'm gonna call this something like app and all we do to generate the application is called Express.

Now the Express function doesn't take in any arguments.

Instead we configure our server by using various methods provided on the application itself.

That means this line is all done and down below we can start to tell our Express application what exactly

it should do.

For this example imagine we owned the following domain.

App dot com.

Now obviously when someone visits app dot com we want to show them something maybe the home page for

our company Web site but we're gonna have other pages as well like app dot com forward slash help or

app dot com forward slash about.

So right here we have one domain app dot com and all of it's going to run on a single express server.

What we have setup though are multiple routes.

We have the route route we have forward slash help we have forward slash about and we could add others.

So how do we set up our server to send a response when someone tries to get something at a specific

route.

We set that up using a method on app it is app dot get this lets us configure what the server should

do when someone tries to get the resource at a specific U.R.L. maybe we should be sending back HDL or

maybe we should be sending back Jason now the get method which we're gonna use a ton throughout the

class takes in two arguments.

The first is the route so the partial you are all that would be nothing for this first example forward

slash help for the second or forward slash about for the third and it also takes in a function.

Now the function is where we describe what we want to do when someone visits this particular route.

So in this case when someone visits the home page this function would describe what to send back to

them.

Now this function gets called with two very important arguments.

The first is an object containing information about the incoming request to the server.

This is commonly called R E Q which is short for request.

You'll see this used throughout the documentation.

The other argument is the response.

So this contains a bunch of methods allowing us to customize what we're going to send back to the requester.

This is commonly called R E S which is short for response.

Now down below we can go ahead and look at their request to figure out what we want to do.

We could do something like read data from the database or create some HDMI all and we could use various

methods on response to actually send a response back.

Let's go ahead and stick with a very basic text response.

Just displaying some text in the browser to get that done.

We're going to use response dot send.

This allows us to send something back to the requester so if someone's making a request from code using

something like the NPM request library they'll get this back.

If they're making the request from the browser this is what's going to display in the browser window

right here.

We're going to pass in a string and we're going to stick with a simple message like hello express.

Perfect.

Now that we have this in place we have something that's going to show up at the root you are.

And now the last thing we need to do is actually start the server up.

Currently the server is not up and running.

If we were to run the application we would never be able to view it in the browser to start the server

up.

We have to use one more method on app which will only ever use a single time in our application that

is app dot.

Listen.

This starts up this server and it has it.

Listen.

On a specific port for the moment we're gonna use a common development port which is port three thousand.

Now port three thousand is obviously not the default port.

When you visit a Web site you don't provide the port because there are default ports for example for

an H TTP based website.

It is port 80.

As we explore production deployment a little bit later in the class we'll learn how to use those ports.

But for now in our local development environment as we're just viewing on our local machine port three

thousand is gonna work really well.

Now the other optional argument we can pass to the listen method is a callback function which just runs

when the server is up and running.

The process of starting up a server isn't a synchronous process though it'll happen almost instantly.

Right here though we could print a little message to the console just letting the person who's running

the application know the server did start correctly.

So right here server is up on port three thousand.

Now this message is never going to display to someone in the browser that is what this message is for.

This is just going to display as a useful piece of information when running the application down below.

Let's go ahead and do just that.

We can start up the server by using Node.

Now since the file isn't in the root of the web server project we'll use source forward slash app dot

J S providing the complete path to it and if we run the script you'll notice that basically instantly

server is up on port three thousand prints.

The other thing you'll notice is that it's been maybe 10 seconds since I originally ran the command

and we haven't been brought back to the command prompt to run something else.

That is because the node process is still up and running with the notes app or the weather app.

There was some discrete task that needed to be completed.

I needed to read a note or I needed to fetch the weather information for a given location.

When that task was done the node process was closed with the web server.

It's never gonna stop unless we stop it because its job is to stay up and running.

Listening and processing new incoming requests so it's staying up and running so if someone does visit

the root of our Web site they can get a response right away.

Now that means that it is going to stay up and running as long as we let it.

We can always shut it down using controlled C that'll shut down the web server and bring us back to

the command prompt and we could always start it again if we need to know that our server is up and running.

Let's go ahead and visited in the browser.

I'm gonna crack open a new tab in the browser and since we're running the server on our local machine

we're not going to be able to access it off of our machine and we're not going to be able to access

it from a real domain.

We'll learn how to do that sort of thing when we explore production deployment.

For now the server is only accessible on our machine and we can access it at local host.

Now it's local host port three thousand.

That is the port we chose to listen on when we called app dot.

Listen.

So right here colon to provide the port and then three thousand if I visit this.

What do I see.

Right here I get my message Hello express printing to the screen.

So when we visited that you are all in the browser it went off to our server the Express server found

the matching route which is this one for the route and it processed the request using our handler the

handler used response dot send to send back a text response and that is exactly what we're seeing inside

of the browser.

Now to set up a second route we just add another call to app dot get so down below.

The first one I'll add a second one and we're still going to pass in that string though this time we're

going to provide the new route.

So instead of nothing for the route of our website we're going to use forward slash help for the help

page.

So right inside of here forward slash help.

Now what do we want to do when someone visits that you are all we're gonna go ahead and set up our function

telling the Express server what it should do.

We're gonna get our two arguments request and response.

And for the moment we are once again going to use response dot send to send something back.

Right here I'll just display a title for the page like Help page.

Perfect.

Now that we have this in place we are going to need to restart our server for the changes to take effect

right now.

The currently running the server has no idea.

You've added something to the file.

We can always fix this by shutting the server down with control C and starting it up again but instead

of doing that over and over again we'll just use node Monde which we installed earlier.

So no demon space source forward slash app dot J S that's going to start up the server and it's going

to restart the server whenever we make a change to abduct Jess and save it.

Now over in the browser I can refresh the route to still see Hello express.

I could also head over to forward slash help to view my help page.

Now if I was to visit any other are which I didn't have setup like forward slash about what are we going

to see.

We're going to see an error message cannot get forward slash about later on we'll learn how to set up

a for a four page four routes that we don't have a support setup for but that's a slightly more complex

topic and it'll come up a bit later.

For now it is challenge time where you're going to add a few new routes to our web server on your own.

Down below I have the challenged comments outlining what I'd like you to do.

Right here you are going to set up two new routes for the server.

So we already have two.

You'll be adding two more for a grand total of four.

One you're going to set up an about route and render a page title.

That means when I visit this U.R.L. I should see something like about page showing up.

And number two you're going to set up a weather route and there you can render a title for that page

as well.

Something like view whether or show weather would get the job done.

The exact text you show isn't important.

What is important is that when you visit your two you are L's in the browser.

You see the text you chose.

So take some time to add those two new routes to our Express server visit both in the browser making

sure they're showing up and when you're done come back and click play

how that go.

Let's kick things off by setting up the about route.

So once again if we want to support a new route we have to set a new one up with app dot get right here

we provide those two arguments forward slash about for the route and then we provide our callback function

telling express what to do when someone visits this route.

Now we get some information about their request which we haven't used so far but we'll use pretty extensively

later on in the class and we get our response which we do indeed need in order to send something back

down below.

We'll be using response dot send to send back a message.

I will just print about now with this in place I should be able to save the file no demand automatically

restarted the server and if I refresh the browser I can see my text showing up which is fantastic.

Next up we can set up the weather page so down below.

That's going to be app dot get forward slash weather would get the job done though maybe you picked

something slightly different.

That's a OK and from here we'll set up our callback function.

We're going to define the request and response arguments and then we're going to send our response down

below using response dot sent.

What are we going to send back.

I'll just send back something like your weather.

Perfect.

Now we have four routes in place and we can test things out over here in the browser.

I'm going to switch from forward slash about to forward slash weather and what do I get.

I get your weather showing up.

So now we have a route.

Page We have a health page and about page and a weather page and our little application is really coming

together down below.

I'm going to go ahead and delete the comments from earlier as well as the challenge comments and I'll

wrap the video up by saving our file now that we have a basic express server in place.

We're gonna be able to continue expanding off of this learning how we can render aid to the AML learning

how we can render Jason or serve up assets from a directory on our machine.

I'm excited to get to all of that and more.

So let's jump right in to the next video.


