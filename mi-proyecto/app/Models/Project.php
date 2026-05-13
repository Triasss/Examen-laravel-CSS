<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = ['nombre','descripcion','users_id','fecha_inicio','fecha_fin'];

    public function tasks()
    {
        return $this->hasMany(Task::class, 'projects_id');
    }   

}
