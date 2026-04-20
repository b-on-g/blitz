namespace $.$$ {
	export class $bog_blitz_profile extends $giper_baza_dict.with({
		Name: $giper_baza_atom_text,
		Color: $giper_baza_atom_text,
		Games_played: $giper_baza_atom_real,
		Total_score: $giper_baza_atom_real,
		Wins: $giper_baza_atom_real,
		Best_score: $giper_baza_atom_real,
		Games_history: $giper_baza_list_link_to(() => $bog_blitz_game_record),
	}) {}

	export class $bog_blitz_game_record extends $giper_baza_dict.with({
		Quiz_title: $giper_baza_atom_text,
		Score: $giper_baza_atom_real,
		Place: $giper_baza_atom_real,
		Players_count: $giper_baza_atom_real,
		Date: $giper_baza_atom_real,
		Land_link: $giper_baza_atom_text,
	}) {}
}
