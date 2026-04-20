namespace $.$$ {

	/** В session land — хост пишет Score, игрок регистрирует Answer_land */
	export class $bog_blitz_player extends $giper_baza_dict.with({
		Score: $giper_baza_atom_real,
		Name: $giper_baza_atom_text,
		IsHost: $giper_baza_atom_bool,
		Avatar: $giper_baza_atom_link_to(() => $giper_baza_file),
		Answer_land: $giper_baza_atom_text,
		Answered_count: $giper_baza_atom_real,
	}) {}

	/** В собственном ленде игрока — только игрок пишет */
	export class $bog_blitz_player_answers extends $giper_baza_dict.with({
		Answer: $giper_baza_atom_text,
		Answer_time: $giper_baza_atom_real,
		Answer_question: $giper_baza_atom_real,
		React_heart: $giper_baza_atom_real,
		React_smile: $giper_baza_atom_real,
		React_fire: $giper_baza_atom_real,
		React_clap: $giper_baza_atom_real,
		React_poop: $giper_baza_atom_real,
	}) {}
}
