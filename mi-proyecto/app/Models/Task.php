<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $fillable = ['description','completada','projects_id'];

    public function project()
    {
        return $this->belongsTo(Project::class, 'projects_id');
    }
}
