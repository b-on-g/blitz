namespace $.$$ {
	export class $bog_blitz_quiz extends $giper_baza_dict.with({
		Title: $giper_baza_atom_text,
		Questions: $giper_baza_list_link_to(() => $bog_blitz_question),
		Time_read: $giper_baza_atom_real,
		Time_answer: $giper_baza_atom_real,
		Time_leaderboard: $giper_baza_atom_real,
		Points_base: $giper_baza_atom_real,
		Time_multiplier: $giper_baza_atom_real,
	}) {}
}
