#!/usr/bin/env node


import  inquirer from "inquirer";

class Student{
    name:string;
    studentId:number;
    static id:number=10000;
    courses:string[]=[];
    balance:number=0;

    constructor(name:string){
        this.name=name;
        this.studentId=++Student.id;
    }
    // addNewStudent(){
    
    // }

    enrollStudentCourse(course:string){
        this.courses.push(course);
    }
    depositAmount(amount:number){
        this.balance+=amount;
        console.log(`Your balance : ${this.balance} and you deposited : ${amount}`);
    }
    viewBalance(){
        console.log(`Veiw Balance for ${this.name} : ${this.balance}`);
    }
    payTuitionFee(amount:number){
        if(this.balance-amount>0){
            this.balance-=amount;
            console.log(`Tuition Fee paid, New balance : ${this.balance}`);    
        }
        else{
            console.log(`Insufficient Balance`);
         }
    }

    showStatus(){
        console.log(`
        Student's Name : ${this.name}\n
        Student's Id : ${this.studentId}\n
        Courses Enrolled : ${this.courses}\n
        Balance : ${this.balance}
        `);
    }
}
 const students:Student[]=[];
async function main() {
    while(true){
        const {choice}= await inquirer.prompt([{
            name:"choice",
            type:"list",
            choices:["Add a new student",
            "Enroll a new student",
            "Deposit accmount to account",
            "View a student's balance",
            "Pay Tuition fee",
            "Show student status",
            "Exit"]
        }])
        switch(choice)
        {
            case "Add a new student":
                const{stuName}=await inquirer.prompt([{
                    name:"stuName",
                    type:"input",
                    message:"Enter student Name :"
                }]);
                const obj=new Student(stuName);
                students.push(obj);
                console.log(`Student Added. Student Id : ${obj.studentId}`);
                
           break;

           case "Enroll a new student":
            const{StuId, stuCourse}=await inquirer.prompt ([{
                name:"StuId",
                type:"number",
                message:"Enter Student Id : ",
            },
             {  name:"stuCourse",
                type:"input",
                message:"Enter the course to be enrolled in : ",

              }]);
        const studentEnrolled =students.find((stu)=>(stu.studentId===StuId)); {
               if(studentEnrolled){
                studentEnrolled.enrollStudentCourse(stuCourse);
            console.log(`${studentEnrolled.name} enrolled for ${stuCourse}`);
               }
               else {
                console.log(`Student with ID ${StuId} not found.`);
               }
            
               }
            break;
            
            case "Deposit accmount to account":
                const {studId, amount } = await inquirer.prompt([{
                    name: "studId",
                    type: "number",
                    message: "Enter the student ID :"
                },{
                    name:"amount",
                    type:"number",
                    message:"Enter the amount to deposit ;"
                }]);
                const studentDeposit =students.find((st)=> st.studentId==studId)
                if(studentDeposit){
                    studentDeposit.depositAmount(amount);
                }else{
                    console.log(`Student with ID ${studId} not found.`);
                    
                } 
            break;
            case"View a student's balance":
            const {studeId}=await inquirer.prompt([{
             name:"studeId",
             type:"number",
             message:"Enter the student ID :"
            }])
         
            const studentBalance= students.find((stu)=>stu.studentId===studeId);
            if(studentBalance){
             studentBalance.viewBalance();
            }else{
             console.log(`Student with ${studeId} not found`);
             }
             break;
         
            case"Pay Tuition fee":
             const {studenId,amountFee}=await inquirer.prompt([{
              name:"studenId",
              type:"number",
              message:"Enter the student ID :"
             },{
                 name:"amountFee",
                 type:"number",
                 message:"Enter the amount you want to Pay  : "
             }])
          
             const studentTuitionFee= students.find((stu)=>stu.studentId===studenId);
             if(studentTuitionFee){
              studentTuitionFee.payTuitionFee(amountFee);
             }else{
              console.log(`Student with Id :${studenId} not found`);
              }
            break;
         
            case"Show student status":
              const {studentId}=await inquirer.prompt([{
               name:"studentId",
               type:"number",
               message:"Enter the student ID :"
              }])
           
              const StudentShowStatus= students.find((stu)=>stu.studentId===studentId);
              if(StudentShowStatus){
                 StudentShowStatus.showStatus();
              }else{
               console.log(`Student with ${studentId} not found`);
               }
            break;

            case "Exit":
                console.log("Goodbye <3");
                process.exit(0);
                

        }
    }
    
}
main();