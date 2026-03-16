namespace $.$$ {
	export class $bog_blitz_player extends $giper_baza_dict.with({
		Score: $giper_baza_atom_real,
		Name: $giper_baza_atom_text,
		IsHost: $giper_baza_atom_bool,
		Avatar: $giper_baza_atom_link_to(() => $giper_baza_file),
	}) {}
}
