AKAI Mpk mini mkII Bitwig Controller Script
=============
Functions marked with * are not yet implemented
## PROG1 
### Joystick
- LEFT/RIGHT: Navigate tacks*
- UP/DOWN: Pitchbend

### Pads CC Mode
```
Bank A                                         Bank B
|---------|---------|---------|---------|      |---------|---------|---------|---------|
|TRANSPORT| TAP     |TRANSPORT| NAVIGATE|      |         |         |         |         | 
| LOOP    | TEMPO*  | OVR     | DEVICE  |      |         |         |         |         |
|         |         |         | UP*     |      |         |         |         |         |
|---------|---------|---------|---------|      |---------|---------|---------|---------| 
|TRANSPORT|TRANSPORT|TRANSPORT| NAVIGATE|      |         |         |         |         |
| STOP    | PLAY    | REC     | DEVICE  |      |         |         |         |         |
|         |         |         | DOWN*   |      |         |         |         |         |
|---------|---------|---------|---------|      |---------|---------|---------|---------|
```
### Pads PROG CHANGE Mode
```
Bank A                                         Bank B
|---------|---------|---------|---------|      |---------|---------|---------|---------|
| DEVICE  | DEVICE  | DEVICE  | DEVICE  |      | DEVICE  | DEVICE  | DEVICE  | DEVICE  | 
|PARAMETER|PARAMETER|PARAMETER|PARAMETER|      |PARAMETER|PARAMETER|PARAMETER|PARAMETER|
| PAGE 5  | PAGE 6  | PAGE 7  | PAGE 8  |      | PAGE 13 | PAGE 14 | PAGE 15 | PAGE 16 |
|---------|---------|---------|---------|      |---------|---------|---------|---------| 
| DEVICE  | DEVICE  | DEVICE  | DEVICE  |      | DEVICE  | DEVICE  | DEVICE  | DEVICE  |
|PARAMETER|PARAMETER|PARAMETER|PARAMETER|      |PARAMETER|PARAMETER|PARAMETER|PARAMETER|
| PAGE 1  | PAGE 2  | PAGE 3  | PAGE 4  |      | PAGE 9  | PAGE 10 | PAGE 11 | PAGE 12 |
|---------|---------|---------|---------|      |---------|---------|---------|---------|
```
### Knobs
```
  /---\     /---\     /---\     /---\
  | 1 |     | 2 |     | 3 |     | 4 |
  \---/     \---/     \---/     \---/
Pag.       Pag.      Pag.      Pag.    
Param 1    Param 2   Param 3   Param 4
  /---\     /---\     /---\     /---\
  | 5 |     | 6 |     | 7 |     | 8 |
  \---/     \---/     \---/     \---/
Pag.       Pag.      Pag.      Pag.    
Param 5    Param 6   Param 7   Param 8
```
____
## PROG2 - Slots grid control with Device knobs
### Joystick
- LEFT/RIGHT/UP/DOWN: Move slots bank

### Pads CC Mode
"Slot" function works this way:
- If slot if empty and can record:            RECORD
- If slot is playing, recording or enqueued:  STOP
- If slot is not empty and not playing:       LAUNCH
```
Bank A                                         Bank B
|---------|---------|---------|---------|      |---------|---------|---------|---------|
|         |         |         |         |      | CLEAR   | CLEAR   | CLEAR   | CLEAR   | 
| SLOT 5  | SLOT 6  | SLOT 7  | SLOT 8  |      | SLOT 5  | SLOT 6  | SLOT 7  | SLOT 8  |
|         |         |         |         |      |         |         |         |         |
|---------|---------|---------|---------|      |---------|---------|---------|---------| 
|         |         |         |         |      | CLEAR   | CLEAR   | CLEAR   | CLEAR   |
| SLOT 1  | SLOT 2  | SLOT 3  | SLOT 4  |      | SLOT 1  | SLOT 2  | SLOT 3  | SLOT 4  |
|         |         |         |         |      |         |         |         |         |
|---------|---------|---------|---------|      |---------|---------|---------|---------|
```
### Pads PROG CHANGE Mode
```
Bank A                                         Bank B
|---------|---------|---------|---------|      |---------|---------|---------|---------|
| DEVICE  | DEVICE  | DEVICE  | DEVICE  |      | DEVICE  | DEVICE  | DEVICE  | DEVICE  | 
|PARAMETER|PARAMETER|PARAMETER|PARAMETER|      |PARAMETER|PARAMETER|PARAMETER|PARAMETER|
| PAGE 21 | PAGE 22 | PAGE 23 | PAGE 24 |      | PAGE 29 | PAGE 30 | PAGE 31 | PAGE 32 |
|---------|---------|---------|---------|      |---------|---------|---------|---------| 
| DEVICE  | DEVICE  | DEVICE  | DEVICE  |      | DEVICE  | DEVICE  | DEVICE  | DEVICE  |
|PARAMETER|PARAMETER|PARAMETER|PARAMETER|      |PARAMETER|PARAMETER|PARAMETER|PARAMETER|
| PAGE 17 | PAGE 18 | PAGE 19 | PAGE 20 |      | PAGE 25 | PAGE 26 | PAGE 27 | PAGE 28 |
|---------|---------|---------|---------|      |---------|---------|---------|---------|
```
### Knobs
```
  /---\     /---\     /---\     /---\
  | 1 |     | 2 |     | 3 |     | 4 |
  \---/     \---/     \---/     \---/
Pag.       Pag.      Pag.      Pag.    
Param 1    Param 2   Param 3   Param 4
  /---\     /---\     /---\     /---\
  | 5 |     | 6 |     | 7 |     | 8 |
  \---/     \---/     \---/     \---/
Pag.       Pag.      Pag.      Pag.    
Param 5    Param 6   Param 7   Param 8
```
## PROG3 - Slots grid control with Device Macro knobs
### Joystick
- LEFT/RIGHT/UP/DOWN: Move slots bank

### Pads CC Mode
"Slot" function works this way:
- If slot if empty and can record:            RECORD
- If slot is playing, recording or enqueued:  STOP
- If slot is not empty and not playing:       LAUNCH
```
Bank A                                         Bank B
|---------|---------|---------|---------|      |---------|---------|---------|---------|
|         |         |         |         |      | CLEAR   | CLEAR   | CLEAR   | CLEAR   | 
| SLOT 5  | SLOT 6  | SLOT 7  | SLOT 8  |      | SLOT 5  | SLOT 6  | SLOT 7  | SLOT 8  |
|         |         |         |         |      |         |         |         |         |
|---------|---------|---------|---------|      |---------|---------|---------|---------| 
|         |         |         |         |      | CLEAR   | CLEAR   | CLEAR   | CLEAR   |
| SLOT 1  | SLOT 2  | SLOT 3  | SLOT 4  |      | SLOT 1  | SLOT 2  | SLOT 3  | SLOT 4  |
|         |         |         |         |      |         |         |         |         |
|---------|---------|---------|---------|      |---------|---------|---------|---------|
```
### Pads PROG CHANGE Mode
```
Bank A                                         Bank B
|---------|---------|---------|---------|      |---------|---------|---------|---------|
|         |         |         |         |      |         |         |         |         | 
|         |         |         |         |      |         |         |         |         |
|         |         |         |         |      |         |         |         |         |
|---------|---------|---------|---------|      |---------|---------|---------|---------| 
|         |         |         |         |      |         |         |         |         |
|         |         |         |         |      |         |         |         |         |
|         |         |         |         |      |         |         |         |         |
|---------|---------|---------|---------|      |---------|---------|---------|---------|
```
### Knobs
```
  /---\     /---\     /---\     /---\
  | 1 |     | 2 |     | 3 |     | 4 |
  \---/     \---/     \---/     \---/
Device     Device    Device    Device
Macro 1    Macro 2   Macro 3   Macro 4
  /---\     /---\     /---\     /---\
  | 5 |     | 6 |     | 7 |     | 8 |
  \---/     \---/     \---/     \---/
Device     Device    Device    Device
Macro 5    Macro 6   Macro 7   Macro 8
```
## PROG4
- Slots grid control 
- User defined device knobs mapping
### Joystick
- LEFT/RIGHT/UP/DOWN: Move slots bank

### Pads CC Mode
"Slot" function works this way:
- If slot if empty and can record:            RECORD
- If slot is playing, recording or enqueued:  STOP
- If slot is not empty and not playing:       LAUNCH
```
Bank A                                         Bank B
|---------|---------|---------|---------|      |---------|---------|---------|---------|
|         |         |         |         |      | CLEAR   | CLEAR   | CLEAR   | CLEAR   | 
| SLOT 5  | SLOT 6  | SLOT 7  | SLOT 8  |      | SLOT 5  | SLOT 6  | SLOT 7  | SLOT 8  |
|         |         |         |         |      |         |         |         |         |
|---------|---------|---------|---------|      |---------|---------|---------|---------| 
|         |         |         |         |      | CLEAR   | CLEAR   | CLEAR   | CLEAR   |
| SLOT 1  | SLOT 2  | SLOT 3  | SLOT 4  |      | SLOT 1  | SLOT 2  | SLOT 3  | SLOT 4  |
|         |         |         |         |      |         |         |         |         |
|---------|---------|---------|---------|      |---------|---------|---------|---------|
```
### Pads PROG CHANGE Mode
```
Bank A                                         Bank B
|---------|---------|---------|---------|      |---------|---------|---------|---------|
|         |         |         |         |      |         |         |         |         | 
|         |         |         |         |      |         |         |         |         |
|         |         |         |         |      |         |         |         |         |
|---------|---------|---------|---------|      |---------|---------|---------|---------| 
|         |         |         |         |      |         |         |         |         |
|         |         |         |         |      |         |         |         |         |
|         |         |         |         |      |         |         |         |         |
|---------|---------|---------|---------|      |---------|---------|---------|---------|
```
### Knobs
```
  /---\     /---\     /---\     /---\
  | 1 |     | 2 |     | 3 |     | 4 |
  \---/     \---/     \---/     \---/
Mapping 1  Mapping 2 Mapping 3 Mapping 4
  /---\     /---\     /---\     /---\
  | 5 |     | 6 |     | 7 |     | 8 |
  \---/     \---/     \---/     \---/
Mapping 5  Mapping 6 Mapping 7 Mapping 8
```

=============

## Installation
- Install *.js files in bitwig controllers scripts folder (see http://www.bitwig.com/en/community/installation_guide)
- Using the MPK mini mkII editor Flash the device with the four programs contained in folder mk2_programs 
