# INFO6122 - Programming JavaScript
## Course Project - CS Team Builder
### Livio Reinoso - ID 1165606
---
### Table of contents
1. [Start Screen](#Start-screen)
2. [Team Selection Screen](#select-team-screen)
3. [Character Selection](#select-agent-screen)
4. [Weapon Selection](#Weapon-Selection-screen)
10. [Annex A - Cheat Codes](#annex-a---cheat-codes)
---
#### Start screen

After starting the application the following screen is being shown:

![Start screen](./assets/images/readme/StartScreen.png)

Notice that there is a speaker icon in the upper left corner. By clicking on it the background music will start playing throughout the application execution.

By clicking on the start button the application will move forward to the "Select team" screen.

---
#### Select Team screen

![Team Selection Screen](./assets/images/readme/SelectTeam.png)

Here you are able to select which to play as: **Terrorists** of **Counter-Terrorists**.

If you're not sure which team to pick, or want the application to pick a random team, you can click on the **Auto select button** and a team will be assigned to you with a 50% chance of being one or the other.

---
#### Select Agent screen

![Character Selection](./assets/images/readme/SelectAgent.png)

On this third screen the user can select which agent will be using on this Counter Strike match.

The list of agents is composed only of characters from the team selected on the previous screen.

There are a few validations implemented on the name input field. These are the following: 

- An agent has been selected from the list
- The input field is not empty
- The name consists of two or fewer words
- The name of the agent is 20 characters long or shorter

Whenever one of these validation rules is broken, a label will be displayed explaining how to correct this, and the *Continue* button gets disabled as shown on the screenshot below:

![Character validation error](./assets/images/readme/SelectAgentError.png)

On top of that, the player can enter different cheat codes on this screen. All of these are detailed on the table on [Annex A](#annex-A---cheat-codes).

---
#### Weapon Selection screen

---
#### Annex A - Cheat codes
| Cheat code | Description |
| ----------- | ----------- |
| umbra witch | Changes the character avatar to Bayonetta |
| final fantasy | Changes the character avatar to Cloud Strife |
| ohip | Changes the character avatar to Dr. Mario |
| squid ink | Changes the character avatar to an Inkling from Splatoon |
| stealyourheart | Changes the character avatar to Persona 5's Joker |
| peachespeaches | Changes the character avatar to Bowser |
| hyrule warrior | Changes the character avatar to Link |
| italian plumber | Changes the character avatar to Mario |
| chomp chomp | Changes the character avatar to Pac-Man |
| pikapika | Changes the character avatar to Wrestling Pikachu |
| bounty hunter | Changes the character avatar to Samus Aran |
| onewingedangel | Changes the character avatar to Sephiroth |
| animal crossing | Changes the character avatar to Isabelle |
| metal gear | Changes the character avatar to Solid Snake |
| sonic speed | Changes the character avatar to Sonic |
|dark force | Changes the character avatar to Darth Vader |
| thisistheway | Changes the character avatar to The Mandalorian |
| lh44blessed | Changes the character avatar to Lewis Hamilton |
| fairy tale | Changes the character avatar to Red Riding Hood |
| mariah carey | Changes the character avatar to Santa Claus |
| toriyama | Changes the character avatar to Son Goku |
| stan lee | Changes the character avatar to Spiderman |
| spiderverse | Changes the character avatar to Spider-Gwen |
| avengersassemble | Changes the character avatar to Tony Stark |
| the witcher | Changes the character avatar to Geralt of Rivia |
| ripandtear | Changes the character avatar to Doom Slayer |
| thelastcrusade | Changes the character avatar to Indiana Jones |
| tomb raider | Changes the character avatar to Lara Croft |
| klapaucius | Multiplies the available money by 2 |
| showmethemoney | Multiplies the available money by 10 |
| povertyfinance | Divides the available money by 2 |
| defaultpayload | Sets a default payload for the character to speed up testing |
| iwannaplay4real | Opens a playable web version of Counter-Strike on a new tab |
