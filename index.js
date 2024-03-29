#! /usr/bin/env node
import inquirer from "inquirer";
const question = await inquirer.prompt([
    {
        type: "name",
        message: "WHATS YOUR GOOOD NAME?",
        name: "username",
    }
]);
console.log("\tGreetings!", question.username, "\nWELCOME TO DEXENT BANK OF PAKISTAN.\nTHIS BANK IS USED FOR ONLY ONE TIME TRANSACTION.\n");
async function main() {
    // sign up & sign in
    const home = await inquirer.prompt([
        {
            name: "login",
            type: "list",
            message: "HOME PAGE",
            choices: ["SIGN UP", "EXIT", "READ ME"],
        }
        // for sign up
    ]);
    if (home.login === "SIGN UP") {
        var signup = await inquirer.prompt([
            {
                name: "signup1",
                type: "input",
                message: "ENTER YOUR NEW USERNAME",
            },
            {
                name: "signup2",
                type: "input",
                message: "ENTER YOUR NEW PASSWORD",
            }
        ]);
        console.log('\n\t"YOU HAVE SUCCESSFULLY CREATED YOUR ACCOUNT"\n');
    }
    else if (home.login === "EXIT") {
        console.log("THANK YOU FOR YOUR PRECIOUS TIME\n\tHAVE A NICE DAY"), process.exit(0);
    }
    else if (home.login === "READ ME") {
        console.log("WHAT IS ATM?\nAn Automated Teller Machine is an electronic banking outlet that allows customers to complete basic transactions without the aid of a branch representative or teller.");
        const homepage = await inquirer.prompt([
            {
                name: "homepage1",
                type: "list",
                message: "WHAT WOULD YOU LIKE TO DO",
                choices: ["GO TO HOME PAGE", "EXIT"],
            }
        ]);
        if (homepage.homepage1 === "GO TO HOME PAGE") {
            return main();
        }
        else
            (console.log("THANK YOU FOR YOUR PRECIOUS TIME\n\tHAVE A NICE DAY"),
                process.exit());
    }
    const { signup1 } = signup;
    const { signup2 } = signup;
    // for sign in
    const signin = await inquirer.prompt([
        {
            name: "signin0",
            type: "list",
            message: "WHAT WOULD YOU LIKE TO DO",
            choices: ["SIGN IN", "EXIT"],
        },
        {
            name: "signin1",
            type: "input",
            message: "NOW ENTER YOUR USERNAME",
            when(signin) {
                return signin.signin0 === "SIGN IN";
            },
        },
        {
            name: "signin2",
            type: "input",
            message: "NOW ENTER YOUR PASSWORD",
            when(signin) {
                return signin.signin0 === "SIGN IN";
            },
        },
    ]);
    if (signin.signin1 + signin.signin2 === signup1 + signup2) {
        console.log("\n\tYOU ARE SUCCESSFULLY LOGIN TO YOUR ACCOUNT\n");
        action123();
        async function action123() {
            // for transaction 
            const action = await inquirer.prompt([
                {
                    name: "action1",
                    type: "list",
                    message: "SELECT YOUR TRANSACTION",
                    choices: ["WITHDRAW", "DEPOSIT", "CHECK BALANCE", "EXIT"],
                },
                {
                    name: "action2",
                    type: "number",
                    message: "ENTER YOUR AMOUNT TO WITHDRAW",
                    when(action) {
                        return action.action1 == "WITHDRAW";
                    },
                },
                {
                    name: "action2",
                    type: "number",
                    message: "ENTER YOUR AMOUNT TO DEPOSIT",
                    when(action) {
                        return action.action1 == "DEPOSIT";
                    },
                }
            ]);
            const balance = 10000; //available balance
            // withdraw section untile line no=168..
            if (action.action1 === "WITHDRAW") {
                console.log("PROCESSING REQUEST....");
                console.log("YOU CURRENT BALANCE IS PKR", balance);
                const amount = action.action2;
                if (balance >= amount) {
                    const remaining = balance - amount;
                    console.log(`TRANSACTION IS SUCCESSFULL.YOUR REMAINING BALANCE IS PKR`, remaining);
                    const conti_nue = await inquirer.prompt([
                        {
                            name: "conti_nue1",
                            type: "list",
                            message: "DO YOU WANT TO CONTINUE",
                            choices: ["YES", "NO"]
                        }
                    ]);
                    if (conti_nue.conti_nue1 === "YES") {
                        return action123();
                    }
                    else
                        (console.log("THANK YOU FOR YOUR PRECIOUS TIME\n\tHAVE A NICE DAY"), process.exit());
                }
                else {
                    console.log("INSUFFICIENT BALANCE.. PLEASE TRY AGAIN WITH A LOWER AMOUNT");
                    return action123();
                }
            }
            // deposit section start
            else if (action.action1 === "DEPOSIT") {
                console.log("PROCESSING REQUEST....");
                console.log("YOU CURRENT BALANCE IS PKR", balance);
                const amount = action.action2;
                if (amount <= 0) {
                    console.log("INVALID REQUEST.\n TRY AGAIN WITH VALID AMOUNT");
                    return action123();
                }
                else if (amount >= 1) {
                    const remaining = balance + amount;
                    console.log("TRANSACTION IS SUCCESSFULL.YOUR REMAINING BALANCE IS PKR", remaining);
                    const conti_nue = await inquirer.prompt([
                        {
                            name: "conti_nue1",
                            type: "list",
                            message: "DO YOU WANT TO CONTINUE?",
                            choices: ["YES", "NO"]
                        }
                    ]);
                    if (conti_nue.conti_nue1 === "YES") {
                        return action123();
                    }
                    else
                        (console.log("THANK YOU FOR YOUR PRECIOUS TIME\n\tHAVE A NICE DAY"),
                            process.exit(0));
                }
            }
            else if (action.action1 === "CHECK BALANCE") {
                console.log("YOUR AVAILABLE BALANCE IS PKR", balance);
                const conti_nue = await inquirer.prompt([
                    {
                        name: "conti_nue1",
                        type: "list",
                        message: "DO YOU WANT TO CONTINUE?",
                        choices: ["YES", "NO"]
                    }
                ]);
                if (conti_nue.conti_nue1 === "YES") {
                    return action123();
                }
                else
                    (console.log("THANK YOU FOR YOUR PRECIOUS TIME\n\tHAVE A NICE DAY"),
                        process.exit(0));
            }
            else if (action.action1 === "EXIT") {
                console.log("THANK YOU FOR YOUR PRECIOUS TIME\n\tHAVE A NICE DAY"),
                    process.exit(0);
            }
        }
    }
    else if (signin.signin0 === "EXIT") {
        console.log("THANK YOU FOR YOUR PRECIOUS TIME\n\tHAVE A NICE DAY"),
            process.exit(0);
    }
    else {
        console.log("\nPLEASE ENTER VALID USERNAME AND PASSWORD\n\nTRY AGAIN");
        return main();
    }
    ;
}
main();
