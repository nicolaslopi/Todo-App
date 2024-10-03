<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Note extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'user_id',
    ];

    //Relación con usuarios(users)
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    //Relación con etiquetas(labels)
    public function labels() {
        return $this->belongsToMany (Label::class, 'label_note');
    }
}
