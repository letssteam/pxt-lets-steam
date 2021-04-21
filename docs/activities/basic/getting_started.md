# Getting Started with MakeCode

## **Discover MakeCode**

### **What is it?**

This workshop will introduce you to the possibilities that programmable things may give you as teachers to engage your students in practical activities that solicit their curiosity in scientific subjects. To this purpose, we first have to develop our computational thinking attitude by challenging our practical problem-solving skills.

The purpose of this first module is to introduce the technical topics that will be used in the next modules. In particular, we will present the physical IoT board that will be used for activities and the MakeCode programming environment.

### **What you'll learn**

- What is the STM32L4 Discovery for IoT Node (simply the board, hereinafter);
- How to connect the board to your PC;
- How to use MakeCode

### **What you need**

- A computer with a modern web browser (e.g. Edge, Chrome, Safari, …) connected to the Internet
- 1 Programming board STM32 [B-L475E-IOT01A](http://www.st.com/en/evaluation-tools/b-l475e-iot01a.html) Discovery kit for IoT node
- 1 Micro-USB (Type B) cable

### What you need to know before we start

Make Code is a free, open-source platform for creating engaging computer science learning experiences. MakeCode was created by Microsoft Research.

We use MakeCode fo. This board is a sort of mini-computer. Technically speaking, the board is an **embedded system**. An embedded system is a computer system designed for a specific purpose, while PCs are general-purpose computer systems.

### **How to use it**

Open your web browser and go to: [https://makecode.st.com/](https://makecode.st.com/). The following will appear.

![Makecode home](/static/projects/getting_started/makecode-home.png)

The MakeCode environment provides us with a few sample projects. Let’s try the first one just to understand how we can execute a project’s code on our board. Let’s click on the “**Blinky Led**” project icon, which you may find as a first project example.

Our web browser now shows the **Development Environment**.

![Makecode editor](/static/projects/getting_started/makecode-ide.png)

The screen can be split into 5 parts :

**The top bar**

Contains the link to return to the home screen, or share your project.
The most important feature is the centre "switch" which allows you to **program with blocks** (enabled per default), or directly **write Javascript's code**.
Then you can also find the help and settings buttons.

When you build your code with blocks, it automatically translates to Javascript, and vice versa.

**The left panel**

Here is the **board simulator,** that is able to reproduce the same behaviour as the physical board. In this example, you can see the LED (on top of the board) blinking.

**The center panel**

In each **colored sections** (Input, Pins, Control, ...) you'll find all **programming blocks** used to create your program, by simply drag-it on **workspace**

**The right panel**

This is your **workspace**. It's the place where you'll place the block to create your programs (or type directly your Javascript).
In the example, you can see there are already placed blocks in your workspace, to make the board's led blinking.

In theory, for simple activities, we might not need the real board and execute our code entirely in the simulator. But this is not what we want! Indeed, we want to execute our code on the real board.

**The bottom bar**

The last section is where you can lots of usefull button, heres what they do (left to right order):

- Hide/show the simulator, if you did not want to see the simulator you can hide it with this button.
- Debugging, useful to find where "bugs" are, and test your code block by block (or line by line in Javascript mode).
- Download, when you finish your development, you can download your program to send it into your STM32 Discovery board.
- The name of your project and the button to save it (Autosave is enabled by default, but when you rename your project, or just to be sure everything is saved, you can use the "Save" button).
- Undo and Redo buttons, when you make something wrong, you can go back with the undo button or use the redo button to replay a modification.
- Zoom buttons, to adjust the workspace zoom level.

### How to upload program into the STM32 Discovery board

Test your program on the simulator it's great but is better to try it on the real board. To do this, you have to follow these simple steps.

1. Connect the STM32L4 Discovery kit to your computer with the USB cable. **The cable MUST be connected to the ST-LINK/V2-1 USB Micro-B female connector on the board.** Once the board has been connected to the PC, it powers on. On the board, the LED close to the USB connector should immediately turn on to RED and, after a few seconds, to GREEN.

   ![Board boot](/static/projects/getting_started/board-boot.jpg)

2. When the connection has been established, the computer will show you a new storage unit (or drive).
3. Download the code to our computer by clicking on the “Download” button; a file (with the _.bin_ extension) will be downloaded.
4. Move this file into the storage unit called `DIS_L4IOT`.
5. As soon as the file is transferred into the board’s storage folder, the board loads the code and executes it. When the transfer is done, the led will start blinking!

   ![Blink](/static/projects/getting_started/blink.gif)

### Going further

[Microsoft MakeCode Computer Science Education](https://www.microsoft.com/en-us/makecode)

[Get Started with MakeCode Tech Education](https://www.microsoft.com/en-us/makecode/get-started?activetab=pivot1%3aprimaryr2)

[Microsoft MakeCode](https://www.youtube.com/channel/UCye7YlvFUUQ1dSy0WZZ1T_Q)

### You may also like

[Blink a LED - Makecode](https://www.notion.so/Blink-a-LED-Makecode-f6fe6d24a4a94c4db523f2a11726e7bc)
