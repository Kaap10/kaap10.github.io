## Four Pillars of OOPs
### 1. Encapsulation: 
- Bundle Data + Methods together
- protect data + hide data/state
- Ex: ATM Machine, only authorized person can access
- use of private/public specifiers + getters/setters
### 2. Abstraction:
- shows only what's needed + hide complexity/implementation
- Ex: car's steering wheel
- use of Abstract class + pure virtual
### 3. Inheritance:
- child class acquires properties of public class
- Ex: Dog IS-A Animal
- use of : public BaseClass
### 4. Polymorphism
- same name, different behaviour
- Ex: "+" sign is use to add no and can be use to concatenate strings
- use of overloading, virtual functions

## Encapsulation Demonstration using getter/setter
`class Student {`
`private:`
	`int marks;` 
`public:`
	`void setMarks(int m) {`
		`if(m >= 0) {`
			`marks = m;`
		`} else {`
			`cout << "Invalid Marks";`
		`}`
	`}`

	`int getMarks() {`
		`return marks'`
	`}`
`}`

	