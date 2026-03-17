namespace $.$$ {
	export class $bog_blitz_question_option extends $giper_baza_dict.with({
		Text: $giper_baza_atom_text,
		Image: $giper_baza_atom_link_to(() => $giper_baza_file),
		Is_correct: $giper_baza_atom_bool,
	}) {}
}
