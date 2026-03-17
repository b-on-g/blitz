namespace $.$$ {
	export class $bog_blitz_question extends $giper_baza_dict.with({
		Text: $giper_baza_atom_text,
		Type: $giper_baza_atom_text,
		Options: $giper_baza_list_link_to(() => $bog_blitz_question_option),
		Correct_option: $giper_baza_atom_real,
		Correct_text: $giper_baza_atom_text,
		Image: $giper_baza_atom_link_to(() => $giper_baza_file),
	}) {}
}
