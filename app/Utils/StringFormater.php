<?php

namespace App\Utils;

class StringFormater
{
    public static function kebabToTitle(string $text): string
    {
        $text = str_replace('-', ' ', $text);
        return ucfirst($text);
    }
}
