# Earther (A hackRU project)
 Web development take on wordle, guessing countries by distance.
Three stage functionality:
* Guess Box allows api search for three objects: country code, flag, and log lat. Calculation is made to find distance between guessed country and answer
* Start Game randomizes a country and pulls basic country information.
* Correct answer state: cache cleared and country submission displayed as correct
The equation between two long lats is: Distance, d = 3963.0 * arccos[(sin(lat1) * sin(lat2)) + cos(lat1) * cos(lat2) * cos(long2 – long1)]



