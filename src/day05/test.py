# f = open("input.txt", "r")
# lines = f.readlines()
# print(lines)
import collections
import functools

lines = ""

with open('input.txt', 'r') as file:
    lines = file.read()

rule_str, update_str = lines.split("\n\n")
rules = collections.defaultdict(list)

for rule in rule_str.splitlines():
    a, b = rule.split("|")
    rules[int(a)].append(int(b))


def order_fun(a, b):
    if b in rules[a]:
        return -1
    elif a in rules[b]:
        return 1
    else:
        return 0


mid_correct, mid_incorrect = 0, 0

for update in update_str.splitlines():
    numbers = list(map(int, update.split(",")))
    sorted_numbers = sorted(numbers, key=functools.cmp_to_key(order_fun))
    print("len:", len(sorted_numbers))
    if numbers == sorted_numbers:
        # print(numbers)
        mid_correct += numbers[len(numbers) // 2]
    else:
        mid_incorrect += sorted_numbers[len(sorted_numbers) // 2]

print(mid_correct)
print(mid_incorrect)