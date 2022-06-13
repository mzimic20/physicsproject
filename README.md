# Velocity Selector Game

This is a physics game where users solve questions about velocity selectors. With a visual animation of the velocity selector and a free simulation mode, users can use this game to better understand the physics of charged particles moving through magnetic and electric fields. The game is implemented as a website using JavaScript.

![Game Screenshot](/screenshot.png)

## Overview of the Game

In this game, users must try to shoot a particle in a straight line through a region of uniform electric and magnetic fields. They are given questions where they must solve for an unknown variable in order to move the particle in a straight line.

There are four variables that can be changed in this game: Electric Field, Magnetic Field, Velocity, and Charge. There are three kinds of problems in this game:
1) Find velocity given electric field, magnetic field, and charge.
2) Find magnetic field given electric field, velocity, and charge.
3) Find electric field given magnetic field, velocity, and charge.

In addition to the main game mode, users can switch to a free simulation mode. Here, they can toggle all variables freely and experiment with how the particle will move using the visual features described below.

## Visual Features

This game contains an animation of the particle moving through the velocity selector. Users can press a button to
simulate the movement of the particle. They can check a box that displays an approximate trajectory of the particle.
They can check boxes that display the electric and magnetic field lines. A parallel plate capacitor is animated as the source of electric field and the region through which the particle moves.

## Overview of the Physics

A velocity selector is a region of uniform electric and magnetic field in which a charged particle will move in a
straight line. This happens when the magnetic force and the electric force are equal in magntidue and opposite in direction. For this to happen, the two fields and the velocity of the particle must all be perpendicular to each other and have the correct magnitudes.

Below is the math behind this: <br>
q = charge (units: C) <br>
v = velocity of the particle (units: m/s) <br>
B = magntic field (units: T) <br>
E = electric field (units: N/C) <br>
Fm = magnetic force (units: N) <br>
Fe = electric force (units: N) <br>
\* is regular multiplication <br>
x is a cross product

Fm = q * v x B <br>
Fe = q E <br>
Fm = Fe <br>
q * v x B = q E <br>
v x B = E <br>

To obtain the proper directions of the fields, we must use the right hand rule to understand the direction of the magnetic force and have it opposite in direction to the electric force. Using the sign conventions implemented in this game, the magnetic field and electric field must have opposite signs.

Using this, here is how you can solve the problems given in the game:
1) Find v given E and B. Use v = E / B
2) Find B given E and v. Use B = E / v * -1.
3) Find E given B and v. Use E = Bv * -1.

## Conventions Used
A positive electric field corresponds to field lines towards the bottom of the screen. A negative electric field corresponds to field lines towards the top of the screen.
A positive magnetic field corresponds to field lines out of the screen. A negative magnetic field corresponds to field lines into the screen.

## Contributors
This game was made by Cullen Anderson and Marko Zimic for our final project in AP Physics C at Stuyvesant High School.
