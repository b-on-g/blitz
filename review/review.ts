namespace $.$$ {

	/**
	 * Отзыв на квиз. Живёт в Quiz Land как dict_to-элемент
	 * (один ленд на квиз содержит и сам квиз, и отзывы к нему).
	 * Ключ в dict — lord игрока (один отзыв на игрока, редактируемый).
	 */
	export class $bog_blitz_review extends $giper_baza_dict.with({
		Text: $giper_baza_atom_text,
		Author_name: $giper_baza_atom_text,
		Author_lord: $giper_baza_atom_text,
		Created: $giper_baza_atom_real,
		Reply: $giper_baza_atom_text,
		Reply_author: $giper_baza_atom_text,
		Reply_created: $giper_baza_atom_real,
	}) {}
}
