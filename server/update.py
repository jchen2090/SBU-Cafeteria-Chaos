import json

# TODO: This might not be the best way to build this url...
jsonPath = "./src/scores.json"


# TODO: This might be prone to errors
def updateSemester(current_semester: str) -> str: 
    [season, year] = current_semester.split(" ")
    
    if (season.lower() == "fall"): 
        season = "Spring"
        year = int(year) + 1
    elif (season.lower() == "spring"):
        season = "Fall" 
    
    return f"{season} {year}"

if __name__ == "__main__":
    with open(jsonPath, "r") as file:
        data = json.load(file)

        current_data = data["highScores"]
        past_data = data["pastSemesters"]
        current_semester = data["currentSemester"]


        # Move all data from current to historical
        data["pastSemesters"] = past_data + current_data
        data["pastSemesters"] = sorted(data["pastSemesters"], key=lambda x: x["score"], reverse=True)
        data["highScores"] = []
        data["currentSemester"] = updateSemester(current_semester)

        # Update json file 
        with open(jsonPath, "w") as file: 
            json.dump(data, file, indent=4)

        print("Successfully reset current data and update to next semester")

