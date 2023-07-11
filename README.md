Take into account that there may be empty files and lines with errors (that do not have the necessary amount of data).
If a line has an error, it must be discarded.
There may also be errors when downloading a file
The Text field cannot be empty or null.
The hex field must have exactly 32 digits
The number field must be a number and not a text

------------------------------------------------------------------------

Layers: Each ring represents an isolated layer in the application.  
Dependency: The dependency direction is from the outside in. Meaning
that the entities layer is independent and the frameworks layer (web,
UI, etc.) depends on all the other layers.

Entities Layer:  
Entities are the core business objects of the system. They represent the
key concepts and data that the system is designed to manage. In a todo
app, for example, the Todo class might be an entity. Entities are
independent of any specific framework or technology, and they contain
the properties of the data they are designed to manage. Entities -
contains all the business entities that construct our application.  
This layer is independent, which means that you will import modules from
different layers.  
This layer wouldn’t be affected by external changes like services,
routing or controllers, also it

Application Business or User Case Logic Layer:  
Business logic refers to the code that implements the business rules and
processes of the system. This includes the use cases or business actions
that the system is designed to support, as well as the entities that
represent the key concepts of the system. Business logic should be
independent of the framework or technology being used to implement the
system.  
Use Cases - This is where we centralize our logic. Each use case
orchestrates all of the logic for a specific business use case. (for
example adding new customers to the system).

Controllers Gateway Presenters Interface Adapters Layer  
Controllers are responsible for handling requests from the user
interface (UI) and delegating tasks to the appropriate use cases or
entities. Using our current application as an example, the controller
will handle an HTTP request, call the TodoActions business logic to
handle the request, and then return a response to the client.
Controllers are part of the infrastructure layer of the system, and they
are dependent on the framework or technology being used.  
Controllers and Presenters - Our controller, presenters, and gateways
are intermediate layers. You can think of them as an entry and exit
gates to the use cases .

Frameworks Drivers Devices DB External Services UI Web Layer  
A framework is a set of libraries or tools that provide a standard way
of building a software system. In the context of clean architecture,
frameworks are part of the infrastructure layer of the system and are
responsible for tasks such as handling HTTP requests and responses,
connecting to databases, and rendering UI templates. Examples of
frameworks include ExpressJS for building web applications and Angular
for building single-page applications. In our context, ExpressJS is our
framework. We would setup ExpressJS below to handle incoming requests to
create, retrieve and mark Todos as complete.  
This code sets up an ExpressJS server and defines routes for creating,
completing, and fetching todos.  
Frameworks - This layer has all the specific implementations. The
database, the web frameworks, error handling etc.  
This layer has all the specific implementations. The database, the web
frameworks, error handling frameworks, etc. Robert C. Martin describes
this layer: “This layer is where all the details go. The web is a
detail. The database is a detail. We keep these things on the outside
where they can do little harm.”

This means it doesn’t matter which database, development framework, UI,
or external services you are using, the entities and the business logic
of the application will always stay the same.

SOLUTIONS USER CASE DEPENDENCY WITH EXTERNAL SERVICES:  
One option is to require a concrete implementations of the file external
services in the use case itself (call directly, for example). This
option will make our file external services concrete implementations
tightly coupled to our use cases.  
Any change in the fiel file external services will lead to changes in
our use case. This option will break our clean architecture assumptions
that use cases express the business process and that frameworks (like
database and external services) are invisible to them.  
Our use cases only knows about the entities and the business logic.
Also, testing the use cases logic will become harder.  
The SOLUTION is to build a gateways between the use case and the
external world.  
With Abstractions we will define a contract between the use cases and
the frameworks. Basically, the contracts are the function signatures of
the desired services. For example, the file external services needs to
provide a “notify” function that gets a file as a parameter and returns
a promise with a boolean value.
