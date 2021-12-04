.data
    10
    12
.text
    lw $t0,0($zero)
    lw $t1,4($zero)
    add $t2,$t1,$t0
    sw $t2,0($sp)
    halt