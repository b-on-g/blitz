namespace $.$$ {

	/** Палитра цветов для граватарок. Индекс из Color-поля или hash id. */
	export const $bog_blitz_palette: readonly string[] = [
		'#e74c3c', '#3498db', '#2ecc71', '#f39c12',
		'#9b59b6', '#1abc9c', '#e67e22', '#34495e',
		'#16a085', '#c0392b',
	]

	/** Цвет граватарки игрока: если Color задан — используется он, иначе дефолт по id */
	export function $bog_blitz_color_for(id: string, color?: string): string {
		if (color && /^#[0-9a-fA-F]{6}$/.test(color)) return color
		let hash = 0
		for (let i = 0; i < id.length; i++) {
			hash = ((hash << 5) - hash + id.charCodeAt(i)) | 0
		}
		const idx = Math.abs(hash) % $bog_blitz_palette.length
		return $bog_blitz_palette[idx]
	}

	/** В session land — хост пишет Score, игрок регистрирует Answer_land */
	export class $bog_blitz_player extends $giper_baza_dict.with({
		Score: $giper_baza_atom_real,
		Name: $giper_baza_atom_text,
		IsHost: $giper_baza_atom_bool,
		Color: $giper_baza_atom_text,
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
