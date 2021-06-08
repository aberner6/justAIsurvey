var q15 = String("${q://QID15/ChoiceGroup/SelectedChoices}").split(",").map(it=>it.trim()).filter(it=>it!=="")
var q9  = String("${q://QID9/ChoiceGroup/SelectedChoices}").split(",").map(it=>it.trim()).filter(it=>it!=="")
var q32 = String("${q://QID32/ChoiceGroup/SelectedChoices}").split(",").map(it=>it.trim()).filter(it=>it!=="") 
var q30 = String("${q://QID30/ChoiceGroup/SelectedChoices}").split(",").map(it=>it.trim()).filter(it=>it!=="") 
var q33 = String("${q://QID33/ChoiceGroup/SelectedChoices}").split(",").map(it=>it.trim()).filter(it=>it!=="") 
var q36 = String("${q://QID36/ChoiceGroup/SelectedChoices}").split(",").map(it=>it.trim()).filter(it=>it!=="") 
var q37 = String("${q://QID37/ChoiceGroup/SelectedChoices}").split(",").map(it=>it.trim()).filter(it=>it!=="") 
var q51 = String("${q://QID51/ChoiceGroup/SelectedChoices}").split(",").map(it=>it.trim()).filter(it=>it!=="") 
var q133 = String("${q://QID133/ChoiceGroup/SelectedChoices}").split(",").map(it=>it.trim()).filter(it=>it!=="") 
var q136 = String("${q://QID136/ChoiceGroup/SelectedChoices}").split(",").map(it=>it.trim()).filter(it=>it!=="") 
var q139 = String("${q://QID139/ChoiceGroup/SelectedChoices}").split(",").map(it=>it.trim()).filter(it=>it!=="") 
var q142 = String("${q://QID142/ChoiceGroup/SelectedChoices}").split(",").map(it=>it.trim()).filter(it=>it!=="") 
var q143 = String("${q://QID143/ChoiceGroup/SelectedChoices}").split(",").map(it=>it.trim()).filter(it=>it!=="") 
var q144 = String("${q://QID144/ChoiceGroup/SelectedChoices}").split(",").map(it=>it.trim()).filter(it=>it!=="") 
var q146 = String("${q://QID146/ChoiceGroup/SelectedChoices}").split(",").map(it=>it.trim()).filter(it=>it!=="") 
var q149 = String("${q://QID149/ChoiceGroup/SelectedChoices}").split(",").map(it=>it.trim()).filter(it=>it!=="") 
var q152 = String("${q://QID152/ChoiceGroup/SelectedChoices}").split(",").map(it=>it.trim()).filter(it=>it!=="") 
var q155 = String("${q://QID155/ChoiceGroup/SelectedChoices}").split(",").map(it=>it.trim()).filter(it=>it!=="") 
var q158 = String("${q://QID158/ChoiceGroup/SelectedChoices}").split(",").map(it=>it.trim()).filter(it=>it!=="") 
var q159 = String("${q://QID159/ChoiceGroup/SelectedChoices}").split(",").map(it=>it.trim()).filter(it=>it!=="") 
var q160 = String("${q://QID160/ChoiceGroup/SelectedChoices}").split(",").map(it=>it.trim()).filter(it=>it!=="") 
var q162 = String("${q://QID162/ChoiceGroup/SelectedChoices}").split(",").map(it=>it.trim()).filter(it=>it!=="") 
var q130 = String("${q://QID130/ChoiceGroup/SelectedChoices}").split(",").map(it=>it.trim()).filter(it=>it!=="") 
var q53 = String("${q://QID53/ChoiceGroup/SelectedChoices}").split(",").map(it=>it.trim()).filter(it=>it!=="") 
var q74 = String("${q://QID74/ChoiceGroup/SelectedChoices}").split(",").map(it=>it.trim()).filter(it=>it!=="") 



const a = {
    "created": "${date://CurrentDate/DS}",
    "email": "${q://QID2/ChoiceTextEntryValue}",
    "response_id": "${rm://Field/ResponseID}",
    "q1": "${q://QID1/ChoiceTextEntryValue}",   
    "q10": "${q://QID10/ChoiceGroup/SelectedChoices}",   
    "q11": "${q://QID11/ChoiceGroup/SelectedChoices}",   
    "q12": "${q://QID12/ChoiceGroup/SelectedChoices}",   
    "q120": "${q://QID120/ChoiceGroup/SelectedChoices}",   
    "q121": "${q://QID121/ChoiceGroup/SelectedChoices}",   
    "q122": "${q://QID122/ChoiceTextEntryValue}",   
    "q123": "${q://QID123/ChoiceTextEntryValue}",   
    "q126": "${q://QID126/ChoiceTextEntryValue}",   
    "q13": "${q://QID13/ChoiceTextEntryValue}",   
    "q130": q130,
    "q131": "${q://QID131/ChoiceTextEntryValue}",   
    "q133": q133,
    "q134": "${q://QID134/ChoiceTextEntryValue}",   
    "q135": "${q://QID135/ChoiceTextEntryValue}",   
    "q136": q136,
    "q137": "${q://QID137/ChoiceTextEntryValue}",   
    "q138": "${q://QID138/ChoiceTextEntryValue}",   
    "q139": q139,
    "q14": "${q://QID14/ChoiceGroup/SelectedChoices}",   
    "q140": "${q://QID140/ChoiceGroup/SelectedChoices}",   
    "q141": "${q://QID141/ChoiceGroup/SelectedChoices}",   
    "q142": q142,
    "q143": q143,
    "q144": q144,
    "q145": "${q://QID145/ChoiceGroup/SelectedChoices}",   
    "q146": q146,
    "q149": q149,
    "q15": q15,
    "q150": "${q://QID150/ChoiceTextEntryValue}",   
    "q151": "${q://QID151/ChoiceTextEntryValue}",   
    "q152": q152,
    "q153": "${q://QID153/ChoiceTextEntryValue}",   
    "q154": "${q://QID154/ChoiceTextEntryValue}",   
    "q155": q155,
    "q156": "${q://QID156/ChoiceTextEntryValue}",   
    "q157": "${q://QID157/ChoiceGroup/SelectedChoices}",   
    "q158": q158,
    "q159": q159,
    "q16": "${q://QID16/ChoiceGroup/SelectedChoices}",   
    "q160": q160,
    "q161": "${q://QID161/ChoiceGroup/SelectedChoices}",   
    "q162": q162,
    "q17": "${q://QID17/ChoiceGroup/SelectedChoices}",   
    "q18": "${q://QID18/ChoiceTextEntryValue}",   
    "q19": "${q://QID19/ChoiceTextEntryValue}",   
    "q2": "${q://QID2/ChoiceTextEntryValue}",   
    "q20": "${q://QID20/ChoiceTextEntryValue}",   
    "q22": "${q://QID22/ChoiceTextEntryValue}",   
    "q23": "${q://QID23/ChoiceTextEntryValue}",   
    "q24": "${q://QID24/ChoiceGroup/SelectedChoices}",   
    "q3": "${q://QID3/ChoiceGroup/SelectedChoices}",   
    "q30": q30,
    "q31": "${q://QID31/ChoiceTextEntryValue}",   
    "q32": q32,
    "q33": q33,
    "q34": "${q://QID34/ChoiceTextEntryValue}",   
    "q35": "${q://QID35/ChoiceGroup/SelectedChoices}",   
    "q36": q36,
    "q37": q37,
    "q38": "${q://QID38/ChoiceGroup/SelectedChoices}",   
    "q39": "${q://QID39/ChoiceTextEntryValue}",   
    "q4": "${q://QID4/ChoiceTextEntryValue}",   
    "q41": "${q://QID41/ChoiceTextEntryValue}",   
    "q5": "${q://QID5/ChoiceTextEntryValue}",   
    "q51": q51,
    "q52": "${q://QID52/ChoiceGroup/SelectedChoices}",   
    "q53": q53,
    "q54": "${q://QID54/ChoiceTextEntryValue}",   
    "q55": "${q://QID55/ChoiceTextEntryValue}",   
    "q56": "${q://QID56/ChoiceTextEntryValue}",   
    "q57": "${q://QID57/ChoiceTextEntryValue}",   
    "q58": "${q://QID58/ChoiceTextEntryValue}",   
    "q60": "${q://QID60/ChoiceTextEntryValue}",   
    "q62": "${q://QID62/ChoiceGroup/SelectedChoices}",   
    "q64": "${q://QID64/ChoiceGroup/SelectedChoices}",   
    "q65": "${q://QID65/ChoiceGroup/SelectedChoices}",   
    "q69": "${q://QID69/ChoiceGroup/SelectedChoices}",   
    "q7": "${q://QID7/ChoiceTextEntryValue}",   
    "q70": "${q://QID70/ChoiceGroup/SelectedChoices}",   
    "q71": "${q://QID71/ChoiceGroup/SelectedChoices}",   
    "q72": "${q://QID72/ChoiceTextEntryValue}",   
    "q73": "${q://QID73/ChoiceTextEntryValue}",   
    "q74": q74,
    "q76": "${q://QID76/ChoiceTextEntryValue}",   
    "q79": "${q://QID79/ChoiceTextEntryValue}",   
    "q8": "${q://QID8/ChoiceTextEntryValue}",   
    "q81": "${q://QID81/ChoiceGroup/SelectedChoices}",   
    "q82": "${q://QID82/ChoiceTextEntryValue}",   
    "q9": q9
}
