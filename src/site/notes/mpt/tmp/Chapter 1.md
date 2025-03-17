---
{"dg-publish":true,"permalink":"/mpt/tmp/chapter-1/"}
---


<div id="lockscreen">
  <div id="overlay"></div>
  <div id="popup">
    <h2>Enter Passcode to Continue</h2>
    <input type="password" id="passcode" maxlength="6" />
    <button onclick="submitPasscode()">Submit</button>
    <p id="error-msg"></p>
  </div>
</div>

<script>
  const correctPasscode = "123455"; // Change this as needed

  document.addEventListener("DOMContentLoaded", () => {
    document.body.classList.add("locked");
    document.getElementById("lockscreen").style.display = "flex";
  });

  function submitPasscode() {
    const enteredPasscode = document.getElementById("passcode").value;
    const errorMsg = document.getElementById("error-msg");

    if (enteredPasscode === correctPasscode) {
      document.body.classList.remove("locked");
      document.getElementById("lockscreen").style.display = "none";
    } else {
      errorMsg.textContent = "Incorrect Passcode. Try Again.";
      document.getElementById("passcode").value = "";
    }
  }
</script>

<style>
  body.locked {
    overflow: hidden;
  }

  #lockscreen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
  }

  #overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    z-index: 9998;
  }

  #popup {
    position: relative;
    background: white;
    padding: 20px;
    text-align: center;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    z-index: 10000;
  }

  #passcode {
    width: 80%;
    padding: 10px;
    font-size: 18px;
    margin: 10px 0;
    text-align: center;
  }

  button {
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
  }

  #error-msg {
    color: red;
    font-size: 14px;
    margin-top: 10px;
  }
</style>

[[home\|Home]] • [[mpt/YHMAH\|Book Info]]
***
![The_20250302_183759_0001.jpg](/img/user/a%20storage/The_20250302_183759_0001.jpg)
***
# Chapter 1 — Petals by the Flower

Just like anyone else in this world, I was born by my father and mother.

***
![1tmp.jpg](/img/user/a%20storage/1tmp.jpg)
![2tmp.jpg](/img/user/a%20storage/2tmp.jpg)

Although, my mother hated my gender, saying I'd be weak and unfit for the job of a spy.

![3tmp.jpg](/img/user/a%20storage/3tmp.jpg)
![4tmp.jpg](/img/user/a%20storage/4tmp.jpg)
![5tmp.jpg](/img/user/a%20storage/5tmp.jpg)

***
##### 22 years later...

![6tmp.jpg](/img/user/a%20storage/6tmp.jpg)

***
This is Jino, one of my best friends. We've known each other long enough to act like siblings.
***

I took a brief moment to chill... and yes, I *did* arrive. Jake stared at me going in through the back entrance with the professor taking his sweet time telling his love story.

I sat down next to Jino, breathing like a dinosaur that ended the run in that browser game.

![7tmp.jpg](/img/user/a%20storage/7tmp.jpg)
![8tmp.jpg](/img/user/a%20storage/8tmp.jpg)

Jino just laughed the joke off, but I stared at him with the disappointed emoji. The professor then started taking attendance and *voila*, I learned *nothing* after the lecture was dismissed.

Oh well, psychology. Roccini in its finest.

"Why take psychology?" you might ask.
You're in for a ride now aren't 'ya?

Not me—but I have no choice. Both in Roccini quarters where I live and here in college takes be back to taking psychology. They're engrained to me forever. Since dad has never quit on me, I try my best at it.

I'm great at *it* though, but I have a love-hate relationship with it.

Worse, I have Calculus for *some* reason. I think I'm gonna fail this semester...

![9tmp.jpg](/img/user/a%20storage/9tmp.jpg)

We started walking to go to our next lecture. I was wondering why Jino wasn't behind me.

![10tmp.jpg](/img/user/a%20storage/10tmp.jpg)
![11tmp.jpg](/img/user/a%20storage/11tmp.jpg)

Sounds reasonable.
***
##### After Calculus, 2:00 PM

![12tmp.jpg](/img/user/a%20storage/12tmp.jpg)

Someone wrapped their arm around my neck so sudden. I looked around and it was Noa.
Noa's the youngest in our circle.

![13tmp.jpg](/img/user/a%20storage/13tmp.jpg)
![14tmp.jpg](/img/user/a%20storage/14tmp.jpg)
![15tmp.jpg](/img/user/a%20storage/15tmp.jpg)
![a storage/16tmp.jpg](/img/user/a%20storage/16tmp.jpg)

Jino turned to me and asked if I want to go home.

![17tmp.jpg](/img/user/a%20storage/17tmp.jpg)

I slurped that ramyeon. I feel a wee bit sorry, but hey, I feel refreshed.

We both went home after eating. As I was walking down Flagell Street near our mansion, someone I don't know messaged me on the phone.

***

[[mpt/tmp/Elia's Journal Entry 1\|Elia's Journal Entry 1]]
[[mpt/tmp/Chapter1-1\|Next]]
[[home\|Home]] • [[mpt/YHMAH\|Book Info]]

***
Copyright © 2025 the sworn library
All Rights Reserved.

