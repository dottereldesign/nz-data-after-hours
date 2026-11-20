const airedCases = [
  {
    "id": "2011-038",
    "question": "A radio host posed as a cop and told a husband his wife wanted a restraining order against his mother. Should the station have aired the call?",
    "outcome": "Not upheld",
    "reason": "The husband said he wanted a divorce and hung up. The BSA criticised how the station checked consent, but reluctantly accepted he had agreed to the recording being broadcast.",
    "source": "https://www.bsa.govt.nz/decisions/all-decisions/albery-and-radioworks-ltd-2011-038/"
  },
  {
    "id": "2016-027",
    "question": "A cricketer’s mum rang to defend her son. The host assured her she was off air while listeners heard the whole call. Fair game?",
    "outcome": "Upheld",
    "reason": "She specifically asked to speak privately. The host gave her every reason to believe she could.",
    "source": "https://www.bsa.govt.nz/decisions/all-decisions/mitchell-and-nzme-radio-ltd-2016-027-3-november-2016/"
  },
  {
    "id": "2021-094",
    "question": "Would you run a trailer for Hustlers in the middle of Minions?",
    "outcome": "Not upheld",
    "reason": "The ad showed no nudity or explicit sex. The BSA judged the actual clips suitable for the PG slot, even though the film being advertised was for an older audience.",
    "source": "https://www.bsa.govt.nz/decisions/all-decisions/quirke-and-discovery-nz-ltd-2021-094-27-october-2021/"
  },
  {
    "id": "2022-120",
    "question": "Hospital photos of an assault survivor had already been on TV. Could a documentary show them again years later?",
    "outcome": "Partly upheld",
    "reason": "The survivor had no advance notice. The BSA found that time and the intimate nature of the images meant they could be private again.",
    "source": "https://www.bsa.govt.nz/decisions/all-decisions/hw-and-sky-network-television-ltd-2022-120-30-may-2023/"
  },
  {
    "id": "2022-037",
    "question": "Breakfast TV covered a cat-food shortage by asking whether “pussies” were fussy. Too much for the morning?",
    "outcome": "Not upheld",
    "reason": "The conversation was about cats. The BSA considered it unlikely that children watching would pick up the double meaning.",
    "source": "https://www.bsa.govt.nz/decisions/all-decisions/carswell-and-television-new-zealand-ltd-2022-037-18-may-2022/"
  },
  {
    "id": "2016-055",
    "question": "A radio winner gave the station her address, school and mobile number to collect a prize. The host accidentally left her live. A breach?",
    "outcome": "Upheld",
    "reason": "Listeners heard enough to identify and contact her. The technical mistake explained the disclosure but didn’t undo the loss of privacy.",
    "source": "https://www.bsa.govt.nz/decisions/all-decisions/madden-and-mediaworks-radio-ltd-2016-055-14-october-2016/"
  },
  {
    "id": "2020-148",
    "question": "Fair Go played a cold call while challenging a company about whether its nappy liners really flushed. Should it air?",
    "outcome": "Not upheld",
    "reason": "The BSA found the challenge to the product claim was supported and the company’s views came through fairly in the programme.",
    "source": "https://www.bsa.govt.nz/decisions/all-decisions/real-nappies-ltd-and/"
  },
  {
    "id": "2014-030",
    "question": "A row over who owned letterbox number 1 became a TV segment about a neighbour’s alleged sex life. Was that fair to the neighbour who stayed off camera?",
    "outcome": "Upheld on action taken",
    "reason": "The allegations left viewers with a damaging picture of him. The broadcaster had already accepted some breaches. The BSA considered its response insufficient.",
    "source": "https://www.bsa.govt.nz/decisions/all-decisions/noble-and-television-new-zealand-ltd-2014-030/"
  },
  {
    "id": "2025-023",
    "question": "A former church member agreed to an interview if her face stayed hidden. Some viewers could still make out her features. Was the masking enough?",
    "outcome": "Upheld",
    "reason": "Anonymity was a condition of the interview. Under some viewing conditions the image revealed more than she had agreed to show.",
    "source": "https://www.bsa.govt.nz/decisions/all-decisions/mcevoy-and-television-new-zealand-ltd-2025-023-3-september-2025/"
  },
  {
    "id": "2021-148",
    "question": "A newsreader laughed just before introducing a Remembrance Sunday story. Should that count against the broadcaster?",
    "outcome": "Not upheld",
    "reason": "Another presenter had just sneezed. In sequence, viewers could tell what the newsreader was laughing at.",
    "source": "https://www.bsa.govt.nz/decisions/all-decisions/omahony-and-television-new-zealand-ltd-2021-148-16-february-2022/"
  },
  {
    "id": "2017-053",
    "question": "A radio guest discussed his relationship with a couple he called A and B. Could the hosts air their intimate story using just those letters?",
    "outcome": "Upheld",
    "reason": "The BSA found the coverage breached the couple’s privacy. Replacing their names with letters didn’t adequately protect them.",
    "source": "https://www.bsa.govt.nz/decisions/all-decisions/jn-and-mediaworks-radio-ltd-2017-053-27-october-2017/"
  },
  {
    "id": "2022-039",
    "question": "Would you leave in the shot of a rugby league player throwing up on the sideline for the 6pm news?",
    "outcome": "Not upheld",
    "reason": "In a sports report showing what happened during the match, the footage fell within the range the BSA considered acceptable.",
    "source": "https://www.bsa.govt.nz/decisions/all-decisions/serfontein-and-discovery-nz-ltd-2022-039-21-june-2022/"
  },
  {
    "id": "2016-063",
    "question": "A listener sent an abusive text. The host repeatedly read out their mobile number and called them on air. Fair response?",
    "outcome": "Upheld",
    "reason": "The listener could reasonably expect their number to stay private. The BSA found the host’s response disproportionate, even for talkback.",
    "source": "https://www.bsa.govt.nz/decisions/all-decisions/tf-and-nzme-radio-ltd-2016-063-15-december-2016/"
  },
  {
    "id": "2014-100",
    "question": "One brother told TV about a fight over their mother’s will. Could producers illustrate his story with old photos of his brothers?",
    "outcome": "Upheld",
    "reason": "One of the brothers pictured had given no consent to show his image in this family dispute. He was awarded privacy compensation.",
    "source": "https://www.bsa.govt.nz/decisions/all-decisions/ws-and-mediaworks-tv-ltd-2014-100/"
  },
  {
    "id": "2019-042",
    "question": "Should a current-affairs show investigate a prolific private sperm donor’s donation history?",
    "outcome": "Not upheld",
    "reason": "The risks of informal donation carried considerable public interest. The donor had a fair opportunity to respond, and the BSA found no private information was disclosed.",
    "source": "https://www.bsa.govt.nz/decisions/all-decisions/ca-and/"
  },
  {
    "id": "2017-025",
    "question": "A host rang a phone-sex line to test the operator’s working voice. Could the station play the call as a joke?",
    "outcome": "Upheld",
    "reason": "Listeners heard an actual worker going about her job, with distinctive background sound. The BSA found the broadcast unfair and a breach of her privacy.",
    "source": "https://www.bsa.govt.nz/decisions/all-decisions/bl-and-mediaworks-radio-ltd-2017-025-9-august-2017/"
  },
  {
    "id": "2023-070",
    "question": "A campaigner parked a car covered in political advertising in public. Did TV have to blur the number plate?",
    "outcome": "Not upheld",
    "reason": "The plate appeared briefly on an already conspicuous vehicle. The BSA found the shot disclosed no private information.",
    "source": "https://www.bsa.govt.nz/decisions/all-decisions/stickland-and-television-new-zealand-ltd-2023-070-7-november-2023/"
  },
  {
    "id": "2016-016",
    "question": "A listener nominated a friend for a shopping spree and described the friend’s relationship as potentially abusive. Should radio air the nomination?",
    "outcome": "Upheld",
    "reason": "Details in the programme and information available elsewhere could identify the husband. The sensitive allegation about him went out with the feel-good story.",
    "source": "https://www.bsa.govt.nz/decisions/all-decisions/ln-and-mediaworks-radio-ltd-2016-016-22-august-2016/"
  },
  {
    "id": "2024-037",
    "question": "A comedian made a dating show for his mum. Could he make jokes at his dad’s expense without telling him about the series?",
    "outcome": "Partly upheld",
    "reason": "Repeated comments could harm his father’s reputation. The BSA said he should have been told about the programme beforehand and the broadcaster’s response fell short.",
    "source": "https://www.bsa.govt.nz/decisions/all-decisions/mustapic-and-television-new-zealand-ltd-2-september-2024/"
  },
  {
    "id": "2021-117",
    "question": "A host replayed a minister’s pause and measured it with truck noises and a gobbling turkey. Fair political commentary?",
    "outcome": "Not upheld",
    "reason": "The BSA considered the gag in the context of a political interview. It found no unfair treatment of the minister or undue offence to listeners.",
    "source": "https://www.bsa.govt.nz/decisions/all-decisions/grant-and-findlay-and-nzme-radio-ltd-2021-117-1-december-2021/"
  },
  {
    "id": "2014-033",
    "question": "A radio station wanted an account settled. Could it name the business on air and ask its director to call about the money?",
    "outcome": "Upheld",
    "reason": "The alleged debt was a private matter. The BSA saw no public interest in announcing it to the station’s audience.",
    "source": "https://www.bsa.govt.nz/decisions/all-decisions/vr-and-apna-networks-ltd-2014-033/"
  },
  {
    "id": "2013-092",
    "question": "A resident gave a TV camera the finger. Could a show keep using the shot in its opening titles eight years later?",
    "outcome": "Upheld",
    "reason": "He was filmed on his property and had repeatedly objected. Keeping his image in the titles breached his privacy.",
    "source": "https://www.bsa.govt.nz/decisions/all-decisions/tj-and-television-new-zealand-ltd-2013-092/"
  },
  {
    "id": "2021-119",
    "question": "Two sisters hugged at the Paralympics during the pandemic. Should the news have cut the hug while distancing rules were in force?",
    "outcome": "Not upheld",
    "reason": "Showing the athletes celebrating together didn’t encourage viewers to break public-health restrictions.",
    "source": "https://www.bsa.govt.nz/decisions/all-decisions/mcdonald-and-discovery-nz-ltd-2021-119-17-november-2021/"
  },
  {
    "id": "2015-074",
    "question": "Breakfast hosts invited listeners to nominate women on Instagram for ridicule. Was a public profile fair game?",
    "outcome": "Upheld",
    "reason": "The BSA found privacy breaches involving both women. It also found the station had done too little after accepting breaches over how the women were treated.",
    "source": "https://www.bsa.govt.nz/decisions/all-decisions/ihaia-and-im-and-mediaworks-radio-ltd-2015-074-10-march-2016/"
  },
  {
    "id": "2019-097",
    "question": "Charges over an allegedly shot-down drone were dropped. Could a panel show let the pilot tell the story without the other man answering?",
    "outcome": "Upheld in part",
    "reason": "The pilot’s version went largely unchallenged. The BSA found the resulting account misleading and the effort to get the other man’s response inadequate.",
    "source": "https://www.bsa.govt.nz/decisions/all-decisions/brereton-and-riches-and-mediaworks-tv-ltd-2019-097-16-june-2020/"
  },
  {
    "id": "2020-019",
    "question": "A presenter told a story about taking the wrong bag, complete with Lil’ Romeo’s gaming console. Could they name another person involved?",
    "outcome": "Upheld on privacy",
    "reason": "Linking the named person to the incident risked real reputational damage. The BSA found they could reasonably expect that detail to remain private.",
    "source": "https://www.bsa.govt.nz/decisions/all-decisions/marino-and-mediaworks-radio-ltd-2020-019-4-august-2020/"
  },
  {
    "id": "2019-035",
    "question": "A consumer show investigated a sale to an elderly customer. Could it show the salesperson’s business card, photo and all?",
    "outcome": "Not upheld",
    "reason": "The brief shot contained professional contact information. The BSA found it wasn’t a highly offensive disclosure of private facts.",
    "source": "https://www.bsa.govt.nz/decisions/all-decisions/ej-oughton-and-gulf-harbour-healthcare-ltd-and/"
  },
  {
    "id": "2026-026",
    "question": "A survivor spoke at a public apology that journalists could watch online. Did that give the news permission to air their personal testimony?",
    "outcome": "Upheld by majority",
    "reason": "The speaker understood that journalists would report the apology. The majority found there had been no clear agreement to broadcast their sensitive personal account.",
    "source": "https://www.bsa.govt.nz/decisions/all-decisions/pe-and-television-new-zealand-ltd-2026-026-11-november-2026/"
  },
  {
    "id": "2018-032",
    "question": "A newsroom used public social-media photos of camp attendees in a story about sexual assault allegations at the camp. Fair use?",
    "outcome": "Upheld",
    "reason": "The allegations made the context particularly sensitive. Showing attendees’ faces without masking them exposed individuals to harm despite the photos’ public origin.",
    "source": "https://www.bsa.govt.nz/decisions/all-decisions/iy-and-mediaworks-tv-ltd-2018-032-5-september-2018/"
  },
  {
    "id": "2022-031",
    "question": "Should the evening news show the knockout punch when reporting who won a heavyweight boxing match?",
    "outcome": "Not upheld",
    "reason": "The punch explained the outcome. Viewers could expect footage of the fight in a sports report about boxing.",
    "source": "https://www.bsa.govt.nz/decisions/all-decisions/sharplin-and-television-new-zealand-ltd-2022-031-30-may-2022/"
  },
  {
    "id": "2015-030",
    "question": "A prison visitor’s face was blurred on a reality show. Could producers still show what the search of her bag revealed?",
    "outcome": "Upheld",
    "reason": "Clothing, voice and other features still identified her. The search revealed private information, including prescription medication.",
    "source": "https://www.bsa.govt.nz/decisions/all-decisions/sw-and-television-new-zealand-ltd-2015-030-18-december-2015/"
  },
  {
    "id": "2016-098",
    "question": "Families posted hospital photos after a school band’s bus crashed. Could the evening news take those pictures from public Facebook?",
    "outcome": "Upheld",
    "reason": "The injured passengers were receiving care and had not agreed to appear on the news. The BSA gave particular weight to their vulnerability.",
    "source": "https://www.bsa.govt.nz/decisions/all-decisions/rickard-and-television-new-zealand-ltd-2016-098-19-april-2017/"
  },
  {
    "id": "2012-036",
    "question": "A fish-and-chip shop got downgraded from a B to a D. Could a reality show broadcast the inspection footage three years later?",
    "outcome": "Upheld on privacy",
    "reason": "The owner had an expectation of seclusion behind the counter. The BSA found no informed consent covering that later broadcast.",
    "source": "https://www.bsa.govt.nz/decisions/all-decisions/fs-and-television-new-zealand-ltd-2012-036/"
  },
  {
    "id": "2025-046",
    "question": "A passer-by stopped to help at a motorway crash. Could a police reality show include them without asking?",
    "outcome": "Not upheld",
    "reason": "The brief shot showed the person helping at the scene. The BSA found it revealed nothing sufficiently private or offensive to breach the standard.",
    "source": "https://www.bsa.govt.nz/decisions/all-decisions/ad-and-television-new-zealand-ltd-2025-046-21-october-2025/"
  },
  {
    "id": "2010-066",
    "question": "Could a radio matchmaking show read out someone’s age and phone number when it received a personal ad in their name?",
    "outcome": "Upheld",
    "reason": "The broadcast exposed the complainant to harassment. The BSA found the way the phone number was disclosed was highly offensive.",
    "source": "https://www.bsa.govt.nz/decisions/all-decisions/nj-and-apna-networks-ltd-2010-066/"
  },
  {
    "id": "2014-048",
    "question": "A TV investigation into rival strip-club owners showed a worker serving drinks. Did the story justify showing her face?",
    "outcome": "Upheld",
    "reason": "She had not agreed to appear in a report about the owners’ dispute. The BSA found the footage breached her privacy.",
    "source": "https://www.bsa.govt.nz/decisions/all-decisions/td-and-mediaworks-tv-ltd-2014-048/"
  },
  {
    "id": "2013-082",
    "question": "An insurer’s reality show wanted to repeat footage of a tenant after a house fire. Four years later, she objected. Air it again?",
    "outcome": "Upheld",
    "reason": "Producers couldn’t establish her consent, and she had objected before this repeat. The BSA found both privacy and fairness breaches.",
    "source": "https://www.bsa.govt.nz/decisions/all-decisions/cg-and-television-new-zealand-ltd-2013-082/"
  },
  {
    "id": "2026-004",
    "question": "A cricket commentator talked about enjoying a few tins during a Test. Did that promote irresponsible drinking?",
    "outcome": "Not upheld",
    "reason": "Alcohol was a small part of the exchange. The BSA found the commentary didn’t advocate excessive drinking.",
    "source": "https://www.bsa.govt.nz/decisions/all-decisions/brownlee-smith-and-television-new-zealand-ltd-2026-004-6-may-2026/"
  },
  {
    "id": "2012-069",
    "question": "A consumer show hired electricians and filmed them inside its test house with a hidden camera. Was that enough reason to show an identifiable worker?",
    "outcome": "Upheld",
    "reason": "He had an expectation of seclusion there. The broadcaster lacked informed consent and the footage offered too little public benefit to justify the intrusion.",
    "source": "https://www.bsa.govt.nz/decisions/all-decisions/cp-and-tvworks-ltd-2012-069/"
  },
  {
    "id": "2020-057",
    "question": "A family spoke on TV after their baby died. Should the show have named the consultant while the health investigation was still open?",
    "outcome": "Upheld",
    "reason": "Naming the consultant implied responsibility before findings were made. They had neither advance notice nor a chance to answer.",
    "source": "https://www.bsa.govt.nz/decisions/all-decisions/hv-and/"
  },
  {
    "id": "2025-004",
    "question": "A Seven Sharp host held a cucumber in a way one viewer thought looked sexual. Too much innuendo for the timeslot?",
    "outcome": "Not upheld",
    "reason": "The BSA considered any innuendo mild. It fitted the playful tone regular viewers would recognise.",
    "source": "https://www.bsa.govt.nz/decisions/all-decisions/kilkenny-television-new-zealand-ltd-2025-004-22-april-2025/"
  },
  {
    "id": "2021-090",
    "question": "Could RNZ use details from stolen hospital files to explain why a child was living in hospital without a placement?",
    "outcome": "Partly upheld",
    "reason": "There was a strong public interest in the placement failure. On Morning Report, the details went far enough to identify the child and breach the family’s privacy.",
    "source": "https://www.bsa.govt.nz/decisions/all-decisions/seven-complainants-and-radio-new-zealand-ltd/"
  },
  {
    "id": "2023-061",
    "question": "A news story about GP shortages showed a grandparent and a child on crutches at a clinic. Did their appearance disclose too much?",
    "outcome": "Not upheld",
    "reason": "The facts disclosed amounted to attending the clinic. The BSA still encouraged broadcasters to get consent when filming patients, especially children.",
    "source": "https://www.bsa.govt.nz/decisions/all-decisions/xp-and-television-new-zealand-ltd-2023-061-20-november-2023/"
  },
  {
    "id": "2026-030",
    "question": "A drama about two stepbrothers carried warnings and a 16 rating. Was 8.30pm late enough to show it?",
    "outcome": "Upheld on offensive content",
    "reason": "The BSA judged the episode strong enough for an 18 classification and a later slot. The rating understated what viewers were about to see.",
    "source": "https://www.bsa.govt.nz/decisions/all-decisions/lidgard-and-television-new-zealand-ltd-2026-030-11-november-2026/"
  },
  {
    "id": "2025-015",
    "question": "An actress said she broke lockdown bubble rules to rehearse. The interviewer said he was glad she did. Should that exchange air?",
    "outcome": "Not upheld",
    "reason": "The BSA considered the remarks in the context of looking back at her audition. They fell below the threshold for promoting illegal or antisocial behaviour.",
    "source": "https://www.bsa.govt.nz/decisions/all-decisions/mayes-and-nzme-radio-ltd-2025-015-26-may-2025/"
  },
  {
    "id": "2020-167",
    "question": "TV news showed children being removed from their homes. Could the public interest in the removals justify showing the children?",
    "outcome": "Upheld",
    "reason": "The footage left enough clues to identify vulnerable children in distress. The BSA found the steps to protect them inadequate.",
    "source": "https://www.bsa.govt.nz/decisions/all-decisions/wl-and-discovery-nz-ltd-2020-167-29-june-2021/"
  },
  {
    "id": "2026-007",
    "question": "A tennis camera zoomed in behind a player bending over her bag. Her skirt lifted, showing the shorts underneath. Keep the shot?",
    "outcome": "Not upheld",
    "reason": "The panel reviewed what viewers actually saw. It found no intimate exposure or gratuitous material in the highlights.",
    "source": "https://www.bsa.govt.nz/decisions/all-decisions/thompson-and-sky-network-television-ltd-2026-007-27-may-2026/"
  },
  {
    "id": "2015-032",
    "question": "A mother told her story after a fatal driveway accident. Could TV also identify her surviving child while discussing her private life?",
    "outcome": "Upheld",
    "reason": "The pictures and name linked the child to sensitive details about the mother. The BSA said the child’s own interests had to come first.",
    "source": "https://www.bsa.govt.nz/decisions/all-decisions/ns-and-sky-network-television-ltd-2015-032/"
  },
  {
    "id": "2023-011",
    "question": "A breakfast host called a by-election candidate a nobody and dismissed the BSA as a waste of time. Out of bounds?",
    "outcome": "Not upheld",
    "reason": "The regulator found neither the politician nor the BSA was treated unfairly. The comments didn’t meet the threshold for widespread offence.",
    "source": "https://www.bsa.govt.nz/decisions/all-decisions/ys-and-nzme-radio-ltd-2023-011-16-may-2023/"
  },
  {
    "id": "2012-012",
    "question": "A TV reporter turned up at a baby-goods business about a refund and secretly recorded the owners. Was that a fair way to get their side?",
    "outcome": "Upheld on fairness",
    "reason": "There had been no earlier attempt to seek comment. The owners objected to filming and weren’t properly informed about how they were taking part.",
    "source": "https://www.bsa.govt.nz/decisions/all-decisions/hodson-and-tvworks-ltd-2012-012/"
  },
  {
    "id": "2025-077",
    "question": "During Country Calendar, a movie promo showed a teenage girl kissing two boys in succession. Suitable for that audience?",
    "outcome": "Not upheld",
    "reason": "The ten-second ad contained brief, clothed kissing. The BSA considered it within the farming programme’s PG rating.",
    "source": "https://www.bsa.govt.nz/decisions/all-decisions/williams-and-television-new-zealand-ltd-2025-077-18-march-2026/"
  },
  {
    "id": "2015-094",
    "question": "Neighbours told a TV crew that a couple threatened them over a right of way. Could the show run the accusations without the couple’s account?",
    "outcome": "Partly upheld",
    "reason": "The allegations could damage the couple’s reputation. Viewers didn’t get their side of the dispute, and the BSA found fairness and privacy breaches.",
    "source": "https://www.bsa.govt.nz/decisions/all-decisions/mx-and-fx-and-television-new-zealand-ltd-2015-094-15-july-2016/"
  },
  {
    "id": "2021-153",
    "question": "A rugby captain gave his detractors a coarse answer in a post-match interview. Should the evening news leave his words in?",
    "outcome": "Not upheld",
    "reason": "The BSA considered the language relatively mild for that setting and recognised the value of hearing an interviewee speak in his own words.",
    "source": "https://www.bsa.govt.nz/decisions/all-decisions/ap-and-television-new-zealand-ltd-2021-153-9-february-2022/"
  },
  {
    "id": "2012-074",
    "question": "A patient secretly recorded a doctor offering experimental treatment for multiple sclerosis. Was the investigation enough to justify airing the consultation?",
    "outcome": "Upheld",
    "reason": "The doctor lacked a fair chance to answer. Without the raw footage, the broadcaster couldn’t establish enough public interest to justify the intrusion.",
    "source": "https://www.bsa.govt.nz/decisions/all-decisions/dr-z-and-television-new-zealand-ltd-2012-074/"
  },
  {
    "id": "2025-060",
    "question": "Radio news played a recording that included the fatal shot in the killing of Charlie Kirk. Was warning listeners beforehand enough?",
    "outcome": "Not upheld",
    "reason": "The introduction gave listeners a reasonable opportunity to switch off. The BSA also recognised the public interest in reporting the event.",
    "source": "https://www.bsa.govt.nz/decisions/all-decisions/gibbs-and-radio-new-zealand-ltd-2025-060-17-december-2025/"
  },
  {
    "id": "2020-088",
    "question": "A local news report called work on a farm track unauthorised. Could it run that description without including the owners’ account?",
    "outcome": "Upheld on accuracy",
    "reason": "The BSA found inadequate checking of the claim. Omitting the owners’ perspective also risked giving viewers a misleading account of the dispute.",
    "source": "https://www.bsa.govt.nz/decisions/all-decisions/jk-and/"
  },
  {
    "id": "2021-163",
    "question": "A political reporter called Simon Bridges a mongrel while assessing a leadership contest. Was that an insult fit for broadcast?",
    "outcome": "Not upheld",
    "reason": "In context the word conveyed tenacity. The BSA understood the reporter to be complimenting a political quality.",
    "source": "https://www.bsa.govt.nz/decisions/all-decisions/millward-and-television-new-zealand-ltd-2021-163-2-march-2022/"
  },
  {
    "id": "2010-007",
    "question": "A man drowned trying to save two children. Should the news show close-ups of relatives as ambulance staff tell them he couldn’t be revived?",
    "outcome": "Privacy upheld by majority",
    "reason": "The majority found the sustained close-ups intruded on the living relatives at an exceptionally vulnerable moment.",
    "source": "https://www.bsa.govt.nz/decisions/all-decisions/rae-schaare-and-turley-and-television-new-zealand-ltd-2010-007/"
  },
  {
    "id": "2019-054",
    "question": "Former employees and board members criticised a health provider on TV and called for an independent review. Was the report fair to management?",
    "outcome": "Not upheld",
    "reason": "The broadcaster sought the organisation’s position and adequately included it. The BSA found the fairness and balance requirements were met.",
    "source": "https://www.bsa.govt.nz/decisions/all-decisions/tongan-health-society/"
  },
  {
    "id": "2017-017",
    "question": "A Bollywood thriller with shootings and beatings aired between 3pm and 6pm without a classification. Acceptable afternoon viewing?",
    "outcome": "Upheld",
    "reason": "The description and absence of a rating left families unable to make an informed choice. The violence warranted an adults-only slot.",
    "source": "https://www.bsa.govt.nz/decisions/all-decisions/sanders-and-apna-networks-ltd-2017-017-9-august-2017/"
  },
  {
    "id": "2025-035",
    "question": "Could an RNZ interviewer repeat the word “prick” when asking Jacinda Ardern about her use of it in Parliament?",
    "outcome": "Not upheld",
    "reason": "The BSA considered the language mild in the context of reporting a former prime minister’s own remark.",
    "source": "https://www.bsa.govt.nz/decisions/all-decisions/allardyce-and-radio-new-zealand-ltd-2025-035-26-august-2025/"
  },
  {
    "id": "2009-088",
    "question": "A programme about girl gangs showed identifiable young teenagers spraying graffiti. Was participation enough permission to show them?",
    "outcome": "Upheld on privacy",
    "reason": "The girls were under 16. The BSA found the disclosures private and the broadcast contrary to their interests.",
    "source": "https://www.bsa.govt.nz/decisions/all-decisions/hastings-district-council-and-tvworks-ltd-2009-088/"
  },
  {
    "id": "2022-018",
    "question": "Should a presenter introduce a racecourse fire with a joke about the hottest racing tip being to save your car?",
    "outcome": "Not upheld",
    "reason": "The actual report treated the fire seriously. Nobody was hurt and the BSA found the joke didn’t mock those who suffered damage.",
    "source": "https://www.bsa.govt.nz/decisions/all-decisions/wade-and-discovery-nz-ltd-2022-018-11-april-2022/"
  },
  {
    "id": "2010-084",
    "question": "Police had a warrant to search a home. Did that mean a reality show could air an identifiable resident’s home and the search?",
    "outcome": "Upheld",
    "reason": "The resident still had an expectation of seclusion. The broadcaster lacked consent and the BSA found insufficient public interest to justify the intrusion.",
    "source": "https://www.bsa.govt.nz/decisions/all-decisions/ma-and-television-new-zealand-ltd-2010-084/"
  },
  {
    "id": "2025-042",
    "question": "A Mother’s Day news story celebrated women who hunt ducks. Did it owe viewers the anti-hunting argument too?",
    "outcome": "Not upheld",
    "reason": "The segment profiled the group and its members. Viewers were unlikely to take it for a comprehensive examination of hunting or its environmental effects.",
    "source": "https://www.bsa.govt.nz/decisions/all-decisions/judge-and-television-new-zealand-ltd-2025-042-23-september-2025/"
  },
  {
    "id": "2017-001",
    "question": "Talkback contributors made hostile remarks about named members of a small religious community. Should the station have let them air?",
    "outcome": "Partly upheld",
    "reason": "The BSA found some individuals had been treated unfairly by the personal comments. One disclosure also breached privacy.",
    "source": "https://www.bsa.govt.nz/decisions/all-decisions/singh-and-radio-virsa-2017-001-27-october-2017/"
  },
  {
    "id": "2026-011",
    "question": "A guest discussing move-on orders wore what appeared to be a keffiyeh. Was showing it discriminatory?",
    "outcome": "Not upheld",
    "reason": "The BSA found the garment’s appearance didn’t encourage hostility towards Jewish people. It distinguished support for Palestinians from antisemitism.",
    "source": "https://www.bsa.govt.nz/decisions/all-decisions/parsons-and-television-new-zealand-ltd-2026-011-10-june-2026/"
  },
  {
    "id": "2011-033",
    "question": "TV twice showed a man being taken to detox after solvent use. His first name, voice and house appeared. Was that sufficiently anonymous?",
    "outcome": "Upheld on privacy",
    "reason": "The combined clues identified him. His history of solvent use was private and the public interest didn’t justify its disclosure.",
    "source": "https://www.bsa.govt.nz/decisions/all-decisions/mq-and-television-new-zealand-ltd-2011-033/"
  },
  {
    "id": "2021-128",
    "question": "A breakfast announcer discussed constipation after childbirth and what she learned at antenatal class. Too personal for morning radio?",
    "outcome": "Not upheld",
    "reason": "The language described bodily functions in ordinary terms. The BSA considered the subject and wording acceptable for the station’s audience.",
    "source": "https://www.bsa.govt.nz/decisions/all-decisions/glen-and-mediaworks-radio-ltd-2021-128-20-december-2021/"
  },
  {
    "id": "2019-045",
    "question": "Hosts questioning fundraisers’ trustworthiness played a recorded phone call. Could they air it if the speaker had no reason to expect a broadcast?",
    "outcome": "Upheld on fairness",
    "reason": "The remarks could damage the people involved. The recorded speaker had no reason to think listeners would hear that conversation.",
    "source": "https://www.bsa.govt.nz/decisions/all-decisions/singh-and-singh-bassi-and-access-community-radio-inc-2019-045-16-december-2019/"
  },
  {
    "id": "2021-060",
    "question": "A street-brawl report briefly showed an identifiable woman talking to police at the scene. Did she have a privacy complaint?",
    "outcome": "Not upheld",
    "reason": "The footage showed a conversation in public. The BSA found it revealed no information she could reasonably expect to remain private.",
    "source": "https://www.bsa.govt.nz/decisions/all-decisions/wightman-and-discovery-nz-ltd-2021-060/"
  },
  {
    "id": "2013-074",
    "question": "A student radio station discussed a local resident’s alleged psychiatric history. Did it matter whether the hosts’ story was even true?",
    "outcome": "Upheld",
    "reason": "The claims concerned intensely personal matters. The BSA found they attracted privacy protection regardless of whether the allegations were true.",
    "source": "https://www.bsa.govt.nz/decisions/all-decisions/hill-and-radio-one-2013-074/"
  },
  {
    "id": "2025-021",
    "question": "During the news, a sitcom promo showed a man’s trousers falling down at a fundraiser. Was pixelating his body enough?",
    "outcome": "Not upheld",
    "reason": "The relevant areas were obscured and the gag involved no sexual behaviour. The BSA considered it suitable for the news slot without a special warning.",
    "source": "https://www.bsa.govt.nz/decisions/all-decisions/pepping-and-discovery-nz-ltd-2025-021-30-june-2025/"
  },
  {
    "id": "2021-150",
    "question": "Fair Go told viewers what had gone wrong with a house build. Could it simplify the dispute if the people criticised said their explanation was lost?",
    "outcome": "Upheld in part",
    "reason": "The BSA found the programme’s portrayal misleading and the complainants’ views unfairly represented. It found no privacy breach.",
    "source": "https://www.bsa.govt.nz/decisions/all-decisions/morrison-and-new-homes-direct-ltd-and-television-new-zealand-ltd-2021-150-31-august-2022/"
  },
  {
    "id": "2025-068",
    "question": "A 90-minute cooking show contained three instances of strong language. Was an M rating and a language warning enough?",
    "outcome": "Not upheld",
    "reason": "The rating and on-screen warning gave viewers useful notice. The amount of swearing fitted the expectations those notices set.",
    "source": "https://www.bsa.govt.nz/decisions/all-decisions/maher-and-television-new-zealand-ltd-2025-068-11-february-2026/"
  },
  {
    "id": "2011-144",
    "question": "A prison search team suggested drugs had been used in a visitor’s car. Could the show include the identifiable visitor in that sequence?",
    "outcome": "Upheld",
    "reason": "The footage linked the individual to highly offensive private details. The BSA ordered privacy compensation.",
    "source": "https://www.bsa.govt.nz/decisions/all-decisions/ds-and-television-new-zealand-ltd-2011-144/"
  },
  {
    "id": "2021-110",
    "question": "A viewer thought they saw bodies in a car wreck on the evening news. Should the pictures have carried a warning?",
    "outcome": "Not upheld",
    "reason": "The BSA reviewed the actual frames and found no bodies visible. The wreck footage itself didn’t require an advisory.",
    "source": "https://www.bsa.govt.nz/decisions/all-decisions/hj-and-discovery-nz-ltd-2021-110-1-december-2021/"
  },
  {
    "id": "2019-019",
    "question": "A radio host aired personal grievances about someone who never got a turn at the microphone. Fair use of an opinion show?",
    "outcome": "Upheld",
    "reason": "The comments could harm the person’s professional and personal reputation. The BSA found they should have been offered a chance to respond.",
    "source": "https://www.bsa.govt.nz/decisions/all-decisions/taimoori-and-5tunz-communications-ltd-2019-019-23-august-2019/"
  },
  {
    "id": "2022-032",
    "question": "A breakfast host joked that he couldn’t wait to become a COVID close contact. Was that irresponsible at the time?",
    "outcome": "Not upheld",
    "reason": "Listeners were likely to hear a flippant comment about the prospect of working from home. The BSA found the humour within the show’s usual territory.",
    "source": "https://www.bsa.govt.nz/decisions/all-decisions/grant-and-nzme-radio-ltd-2022-032-6-july-2022/"
  },
  {
    "id": "2021-160",
    "question": "A road-toll story showed a collision involving a truck and discussed possible causes of crashes. Did that unfairly blame the truck driver?",
    "outcome": "Not upheld",
    "reason": "The driver wasn’t identified. The police comments were about crashes generally and didn’t suggest the driver in this footage had driven unsafely.",
    "source": "https://www.bsa.govt.nz/decisions/all-decisions/dx-and-television-new-zealand-ltd-2021-160-21-march-2022/"
  },
  {
    "id": "2024-100",
    "question": "A TV quiz asked which astronaut never walked on the moon, then joked that perhaps nobody had. Too misleading for a quiz?",
    "outcome": "Declined to determine",
    "reason": "The BSA treated the complaint as trivial. It made no finding that the broadcaster had breached a standard.",
    "source": "https://www.bsa.govt.nz/decisions/all-decisions/lehany-and-television-new-zealand-ltd-2024-100-22-april-2025/"
  },
  {
    "id": "2019-112",
    "question": "Radio hosts told a story about an embalmer preserving their own cat. After an apology, did the regulator need to step in?",
    "outcome": "Breach accepted; response sufficient",
    "reason": "The broadcaster accepted unfair treatment, apologised directly and counselled the hosts. The BSA found those steps proportionate.",
    "source": "https://www.bsa.govt.nz/decisions/all-decisions/hs-and-mediaworks-radio-ltd-2019-112-27-may-2020/"
  },
  {
    "id": "2025-065",
    "question": "Can you advertise a 16-rated dating show during a G-rated talent contest?",
    "outcome": "Not upheld",
    "reason": "The BSA assessed the Love Island USA promo itself. Its fleeting suggestive material was mild enough for the America’s Got Talent slot.",
    "source": "https://www.bsa.govt.nz/decisions/all-decisions/malthus-and-television-new-zealand-ltd-2025-065-18-march-2026/"
  },
  {
    "id": "2021-035",
    "question": "A station apologised for a racial slur in a hip-hop song and pulled the track. Should the BSA still decide the complaint?",
    "outcome": "Declined to determine",
    "reason": "The regulator considered the apology and removal sufficient reason to leave the matter there. It didn’t decide whether the song breached a standard.",
    "source": "https://www.bsa.govt.nz/decisions/all-decisions/foster-and-3/"
  },
  {
    "id": "2021-129",
    "question": "A radio interview revealed a guest’s vaccination status. Was it fair to put that medical detail on air?",
    "outcome": "Not upheld",
    "reason": "The BSA found that the guest willingly took part in disclosing her status in the conversation.",
    "source": "https://www.bsa.govt.nz/decisions/all-decisions/nightingale-and-nzme-radio-ltd-2021-129-20-december-2021/"
  },
  {
    "id": "2025-031",
    "question": "A TV cook told his slurping companion that his mum would have smacked him for it. Was that promoting violence?",
    "outcome": "Not upheld",
    "reason": "The exchange was a passing remark about table manners. The BSA found it unlikely to encourage serious antisocial behaviour.",
    "source": "https://www.bsa.govt.nz/decisions/all-decisions/skinner-and-television-new-zealand-ltd-2025-031-29-july-2025/"
  },
  {
    "id": "2022-024",
    "question": "An Olympian’s dad swore live on the 6pm news after her gold medal. Did the station do enough afterwards?",
    "outcome": "Breach accepted; response sufficient",
    "reason": "The broadcaster accepted the breach, apologised and drew up guidance for live guests. The BSA considered that response adequate.",
    "source": "https://www.bsa.govt.nz/decisions/all-decisions/taylor-and-discovery-nz-ltd-2022-024-26-april-2022/"
  },
  {
    "id": "2025-020",
    "question": "A presenter said the prime minister needed to grow a bigger set of balls. Too crude for political commentary?",
    "outcome": "Not upheld",
    "reason": "The BSA recognised the wording was provocative. It was unlikely to cause widespread undue offence in the context of the show.",
    "source": "https://www.bsa.govt.nz/decisions/all-decisions/grant-and-nzme-radio-ltd-2025-020-30-june-2025/"
  },
  {
    "id": "2021-141",
    "question": "An uncensored swear word appeared in a news image by mistake. Was an apology and a conversation with producers enough?",
    "outcome": "Breach accepted; response sufficient",
    "reason": "Prime accepted the good-taste breach, apologised to the complainant and addressed the error with its producers. The BSA found the action adequate.",
    "source": "https://www.bsa.govt.nz/decisions/all-decisions/cribb-and-sky-network-television-2021-141-9-february-2022/"
  },
  {
    "id": "2022-010",
    "question": "Should the news have cut footage of someone reacting badly to a COVID nasal swab?",
    "outcome": "Not upheld",
    "reason": "Showing what testing involved served a public purpose. The BSA found the reaction unlikely to cause widespread undue offence.",
    "source": "https://www.bsa.govt.nz/decisions/all-decisions/williamson-and-television-new-zealand-ltd-2022-010-7-march-2022/"
  },
  {
    "id": "2025-043",
    "question": "A broadcaster made a “Praise the Lorde” pun about the singer. Should the regulator hear a blasphemy complaint?",
    "outcome": "Declined to determine",
    "reason": "The BSA applied its guidance on complaints about blasphemy and chose not to issue a ruling on the merits.",
    "source": "https://www.bsa.govt.nz/decisions/all-decisions/steer-and-television-new-zealand-ltd-2025-043-23-september-2025/"
  },
  {
    "id": "2021-139",
    "question": "Kim Hill pressed John Tamihere in an interview about Māori vaccination rates. Did the robust questioning deny him a fair hearing?",
    "outcome": "Not upheld",
    "reason": "Tamihere had enough time to explain his views. The interview style was familiar to RNZ listeners, and other perspectives were available.",
    "source": "https://www.bsa.govt.nz/decisions/all-decisions/jones-and-radio-new-zealand-ltd-2021-139-9-february-2022/"
  },
  {
    "id": "2021-042",
    "question": "A reality show featured tenants’ homes. Could those details identify the tenants even without naming them?",
    "outcome": "Not upheld by majority",
    "reason": "Most members thought viewers couldn’t identify the tenants. A dissenting member thought the details exposed one tenant’s private information.",
    "source": "https://www.bsa.govt.nz/decisions/all-decisions/vette-and-television-new-zealand-ltd-2021-042-11-august-2021/"
  },
  {
    "id": "2023-049",
    "question": "Sunday used a picture taken on someone’s property. Did that alone entitle the owner to a privacy or fairness finding?",
    "outcome": "Not upheld",
    "reason": "The owner couldn’t be identified from the broadcast and the programme didn’t refer to them. The BSA found neither standard was breached.",
    "source": "https://www.bsa.govt.nz/decisions/all-decisions/jl-and-television-new-zealand-ltd-2023-049-30-august-2023/"
  },
  {
    "id": "2021-074",
    "question": "A promo joked that duck season had started badly because someone shot Trevor Mallard. Too far for a political pun?",
    "outcome": "Not upheld",
    "reason": "The BSA expected viewers to recognise the play on the politician’s surname. It found no encouragement of illegal activity.",
    "source": "https://www.bsa.govt.nz/decisions/all-decisions/judge-and-television-new-zealand-ltd-2021-074-22-september-2021/"
  },
  {
    "id": "2026-031",
    "question": "A farmer said “shit” twice on a PG episode of Country Calendar. Should that trigger a standards ruling?",
    "outcome": "Declined to determine",
    "reason": "The BSA pointed to earlier decisions about mild language and declined to take this complaint further.",
    "source": "https://www.bsa.govt.nz/decisions/all-decisions/beekhuis-and-television-new-zealand-ltd-2026-031-30-september-2026/"
  },
  {
    "id": "2022-062",
    "question": "A newsreader reported allegations about a departing Breakfast presenter after another outlet had published them. Was that a privacy breach?",
    "outcome": "Not upheld",
    "reason": "The BSA found significant public interest and no reasonable expectation of privacy in the information reported by 1 News.",
    "source": "https://www.bsa.govt.nz/decisions/all-decisions/short-and-television-new-zealand-ltd/"
  },
  {
    "id": "2022-028",
    "question": "Radio hosts talked about touching their testicles when nervous. Was that too much for listeners who might have children in the car?",
    "outcome": "Not upheld",
    "reason": "The BSA considered the conversation against Radio Hauraki’s audience and the show’s usual style. It found little likelihood of harm to children listening.",
    "source": "https://www.bsa.govt.nz/decisions/all-decisions/mitchell-and-nzme-radio-ltd-2022-028-21-june-2022/"
  },
  {
    "id": "2021-096",
    "question": "A trailer for Killer Couples ran before 8pm during Drop Dead Fred. Was that too early?",
    "outcome": "Not upheld",
    "reason": "Despite its title, the promo didn’t show violence of the kind alleged. The actual material fitted the PG slot.",
    "source": "https://www.bsa.govt.nz/decisions/all-decisions/gibson-and-discovery-nz-limited-2021-096-27-october-2021/"
  },
  {
    "id": "2025-016",
    "question": "Anika Moa’s show warned listeners about colourful language, then delivered plenty of it. Was the warning enough?",
    "outcome": "Not upheld",
    "reason": "The advance notice gave the audience, including adults supervising children, a reasonable chance to choose whether to listen.",
    "source": "https://www.bsa.govt.nz/decisions/all-decisions/hall-and-radio-new-zealand-ltd-2025-016-26-may-2025/"
  }
];
