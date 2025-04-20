<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;

class Task extends Model
{

    use HasFactory;
    use LogsActivity;

     protected $fillable = [
         'title',
         'description',
         'user_id',
       ];

       public function getActivitylogOptions(): LogOptions
       {
           return LogOptions::defaults()
               ->logOnly(['title', 'description' , 'user_id'])
               ->logOnlyDirty()
               ->dontSubmitEmptyLogs();
       }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
