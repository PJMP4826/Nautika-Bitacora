<?php

namespace Database\Seeders;

use App\Models\Zone;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ZoneSeeder extends Seeder
{
    public function run(): void
    {
        $zones = [
            [
                'name' => 'Cabo Esperanza',
                'region' => 'Costa Norte',
                'description' => 'Una extensa playa de arena dorada ideal para iniciarse en el surfcasting. Aguas tranquilas y fácil acceso.',
                'regulations' => 'Licencia recreativa estándar. Prohibida la pesca nocturna sin permiso especial.',
                'image' => 'https://static1.evcdn.net/images/reduction/1248175_w-3840_h-1280_q-70_m-crop.jpg',
                'water_type_id' => 'mar',
                'experience_level_id' => 'beginner',
                'rating' => 4.8,
                'latitude' => 22.8905260,
                'longitude' => -109.9167399,
                'seasons' => ['spring', 'summer'],
                'fishing_types' => ['surfcasting', 'spinning'],
                'fish' => [
                    ['name' => 'Lenguado', 'scientific_name' => 'Paralichthys lethostigma', 'image' => 'https://biogeodb.stri.si.edu/caribbean/resources/img/images/species/4305_15794.jpg'],
                    ['name' => 'Corvina', 'scientific_name' => 'Cynoscion nebulosus', 'image' => 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpOPnr5g0WcSFLXcTTzysJ0dM2OnKGBf-aNwJ30GiYh5vrKXh61zjPkyIEOnx-U45vyTpLfWpaFou_nMpT2njaYgqE-k0AwaFTORIwMQ&s=10'],
                    ['name' => 'Pez Payaso', 'scientific_name' => 'Amphiprion ocellaris', 'image' => 'https://upload.wikimedia.org/wikipedia/commons/a/ad/Amphiprion_ocellaris_%28Clown_anemonefish%29_by_Nick_Hobgood.jpg'],
                    ['name' => 'Damisela', 'scientific_name' => 'Stegastes partitus', 'image' => 'https://inaturalist-open-data.s3.amazonaws.com/photos/30719483/original.jpg'],
                ],
            ],
            [
                'name' => 'Arrecife del Silencio',
                'region' => 'Archipiélago Sur',
                'description' => 'Zona de corrientes fuertes y gran profundidad. El hogar de grandes depredadores pelágicos.',
                'regulations' => 'Obligatorio radio VHF. Captura y suelta recomendada para especies de pico.',
                'image' => 'https://res.cloudinary.com/luximia/image/upload/v1625251954/Shark/Blogs/es/el-segundo-arrecife-de-coral-mas-grande-del-mundo-esta-en-mexico_jc1rbw.jpg',
                'water_type_id' => 'mar',
                'experience_level_id' => 'expert',
                'rating' => 4.9,
                'latitude' => 20.4230000,
                'longitude' => -86.9223000,
                'seasons' => ['autumn', 'winter'],
                'fishing_types' => ['deepsea', 'trolling'],
                'fish' => [
                    ['name' => 'Atún', 'scientific_name' => 'Thunnus thynnus', 'image' => 'https://www.bigfish.mx/img/2017/12/11/atun-sangre-caliente_1.jpg?__scale=w:1200,h:900,t:2'],
                    ['name' => 'Marlín', 'scientific_name' => 'Makaira nigricans', 'image' => 'https://fishesofaustralia.net.au/Images/Image/MakairaNigricans5JThomasMcMurray.jpg'],
                    ['name' => 'Pez Espada', 'scientific_name' => 'Xiphias gladius', 'image' => 'https://thumbs.dreamstime.com/b/swordfish-xiphias-gladius-long-pointed-bill-sleek-elongated-body-th-swordfish-xiphias-gladius-long-pointed-bill-374414549.jpg'],
                ],
            ],
            [
                'name' => 'Estero Azul',
                'region' => 'Delta del Río',
                'description' => 'Laberinto de manglares donde el río se encuentra con el mar. Perfecto para pesca ligera.',
                'regulations' => 'Motor eléctrico solamente para preservar el ecosistema.',
                'image' => 'https://cdn0.ecologiaverde.com/es/posts/2/8/6/que_es_un_manglar_y_sus_caracteristicas_1682_600.jpg',
                'water_type_id' => 'rio',
                'experience_level_id' => 'intermediate',
                'rating' => 4.5,
                'latitude' => 18.6500000,
                'longitude' => -91.8167000,
                'seasons' => ['spring', 'autumn'],
                'fishing_types' => ['flyfishing', 'spinning'],
                'fish' => [
                    ['name' => 'Sábalo', 'scientific_name' => 'Megalops atlanticus', 'image' => 'https://upload.wikimedia.org/wikipedia/commons/e/e2/Tarpon3.JPG'],
                    ['name' => 'Pargo', 'scientific_name' => 'Lutjanus campechanus', 'image' => 'https://upload.wikimedia.org/wikipedia/commons/b/b7/Red_Snapper.jpg'],
                    ['name' => 'Róbalo', 'scientific_name' => 'Centropomus undecimalis', 'image' => 'https://static1.squarespace.com/static/62be3fe5e94e2d5ce490b6f6/62d5beff7e34845356285cc9/68f8f4cdda7fd3382ee4d52d/1777477346250/Snook.jpeg?format=1500w'],
                ],
            ],
            [
                'name' => 'Bahía de los Vientos',
                'region' => 'Costa Este',
                'description' => 'Playa rocosa con fuerte oleaje, ideal para pescadores que buscan sargos y doradas en la espuma.',
                'regulations' => 'Precaución extrema con las mareas.',
                'image' => 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/09/68/74/51/bahia-de-los-vientos.jpg?w=1200&h=-1&s=1',
                'water_type_id' => 'mar',
                'experience_level_id' => 'intermediate',
                'rating' => 4.2,
                'latitude' => 18.7167000,
                'longitude' => -87.7000000,
                'seasons' => ['winter'],
                'fishing_types' => ['surfcasting'],
                'fish' => [
                    ['name' => 'Sargo', 'scientific_name' => 'Diplodus sargus', 'image' => 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Diplodus_sargus_01.jpg'],
                    ['name' => 'Dorada', 'scientific_name' => 'Sparus aurata', 'image' => 'https://inaturalist-open-data.s3.amazonaws.com/photos/154812228/original.jpeg'],
                    ['name' => 'Lubina', 'scientific_name' => 'Dicentrarchus labrax', 'image' => 'https://canalmarmenor.carm.es/wp-content/uploads/2021/03/Dicentrarchus-labrax1.jpg'],
                ],
            ],
            [
                'name' => 'Lago Esmeralda',
                'region' => 'Sierra Alta',
                'description' => 'Lago de alta montaña con aguas cristalinas. Ideal para la pesca de trucha en un entorno sereno.',
                'regulations' => 'Pesca sin muerte obligatoria.',
                'image' => 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Emerald_Lake-Yoho.jpg',
                'water_type_id' => 'lago',
                'experience_level_id' => 'beginner',
                'rating' => 4.7,
                'latitude' => 16.1167000,
                'longitude' => -91.6833000,
                'seasons' => ['spring', 'summer'],
                'fishing_types' => ['flyfishing', 'spinning'],
                'fish' => [
                    ['name' => 'Trucha Arcoíris', 'scientific_name' => 'Oncorhynchus mykiss', 'image' => 'https://cdn.bmeditores.mx/2026/01/Factores-Esenciales-Truchicultura-Sostenible-Rentable.jpg'],
                    ['name' => 'Black Bass', 'scientific_name' => 'Micropterus salmoides', 'image' => 'https://aquahoy.com/wp-content/uploads/2026/02/Micropterus_salmoides_Lake_Biwa_Museum.jpg'],
                ],
            ],
        ];

        foreach ($zones as $zoneData) {
            $seasons = $zoneData['seasons'];
            $fishingTypes = $zoneData['fishing_types'];
            $fish = $zoneData['fish'];
            unset($zoneData['seasons'], $zoneData['fishing_types'], $zoneData['fish']);

            $zoneData['slug'] = Str::slug($zoneData['name']);
            $zoneData['active'] = true;

            $zone = Zone::updateOrCreate(
                ['slug' => $zoneData['slug']],
                $zoneData
            );

            $zone->seasons()->sync($seasons);
            $zone->fishingTypes()->sync($fishingTypes);

            foreach ($fish as $fishData) {
                $fishData['slug'] = Str::slug($fishData['name']);
                $zone->fish()->updateOrCreate(
                    ['slug' => $fishData['slug']],
                    $fishData
                );
            }
        }
    }
}
