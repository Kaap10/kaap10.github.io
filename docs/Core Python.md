---
id: core-python
title: Core Python — Quick Revision Notes
sidebar_label: Core Python
sidebar_position: 2
---

# Core Python — Quick Revision Notes

---

## 1. What is Python?
- **High-level**: No manual memory management (no pointers / malloc like C/C++).
- **Interpreted**: Code compiles to bytecode (`.pyc`), executed line-by-line by Python Virtual Machine (PVM).
- **Dynamically Typed**: Variable types are verified and bound to objects at **runtime**, not at compile time.
- **Object-Oriented**: Everything in Python is an object (functions, classes, integers are objects too).
- **Why in Full Stack?**: Developer velocity (1/3 less code than Java/C++), massive package ecosystem (PyPI), and unified language for APIs (Flask/FastAPI), Celery background tasks, and AI integrations.

---

## 2. Syntax, Variables & Dynamic Typing
- **Variables are References**: Variables don't hold values directly—they are sticky-note labels holding references (memory addresses) to objects in heap memory.
- **Dynamic Typing**: A variable can point to an `int`, then later point to a `str`.

```python
# Variables & Dynamic Typing
a = 10
print(type(a).__name__)  # 'int'
a = "hello world"        # Now points to string object
print(type(a).__name__)  # 'str'
```

### Mutability:
- **Immutable** (`int`, `float`, `str`, `tuple`, `bool`, `frozenset`): Once created, object in RAM cannot be modified. Any change creates a **new object** at a new memory address (`id()`).
- **Mutable** (`list`, `dict`, `set`): Object can be modified in-place without changing its memory address.

```python
# Immutable (int) -> creates new object
x = 10
print(id(x))
x = x + 1
print(id(x))  # Different memory address!

# Mutable (list) -> modifies in-place
list1 = [1, 2, 3]
list2 = list1         # Both point to SAME memory address
list2.append(99)
print(list1)          # [1, 2, 3, 99] -> list1 modified too!
print(id(list1) == id(list2))  # True
```

> **Viva Point: Why are Strings Immutable in Python?**
> 1. **Security & Hashability**: Strings are used as dict keys and set elements; immutability guarantees their hash value never changes.
> 2. **String Interning (Memory)**: Identical immutable strings share the same memory address.
> 3. **Thread Safety**: Can be safely shared across concurrent threads without locks.

---

## 3. Input / Output & Type Casting
- `input()` **always** returns `str` (like data received from a web form field).
- Explicit casting: `int()`, `float()`, `bool()`, `str()`.

```python
age = input("Enter age: ")  # User inputs: 22 -> "22" (str)
age_num = int(age)          # 22 (int)

# The bool() Trap:
bool("False")  # True (Any non-empty string is True!)
bool("")       # False (Empty string is Falsy)

# Safe Conversion without crash:
user_val = "abc"
if user_val.isdigit():
    num = int(user_val)
else:
    # Or use try...except ValueError
    print("Invalid number format")
```

---

## 4. Operators, Division & Truthy/Falsy
- **True Division (`/`)**: Always returns `float` (`7 / 2 = 3.5`).
- **Floor Division (`//`)**: Rounds down toward -infinity (`7 // 2 = 3`, `-7 // 2 = -4`).
- **Modulo (`%`)**: Remainder (`7 % 2 = 1`).
- **Falsy Values in Python**: `0`, `0.0`, `""`, `[]`, `()`, `{}`, `set()`, `None`, `False`. Everything else is **Truthy**.

```python
# Pythonic Falsy check (Cart empty check)
cart = []
if not cart:
    print("Cart is empty!")  # Runs because [] is Falsy
```

> **Viva Gotcha**: In payment logic, `discount = 0` is valid (0% discount). Checking `if not discount:` treats `0` as Falsy! Always check `if discount is None:`.

---

## 5. Control Flow & `for...else`
- `if-elif-else`, `for`, `while`.
- **`for...else` / `while...else`**: The `else` block executes **ONLY if the loop finishes normally without hitting a `break`**.

```python
# for-else search pattern (No need for extra found=False flag)
users = ["alice", "bob", "charlie"]
target = "david"

for u in users:
    if u == target:
        print("User Found!")
        break
else:
    print("User Not Found!")  # Executes because no break occurred!
```

- **Common Trap**: Never remove or insert items in a list while iterating over it directly with `for item in lst:` (causes skipped elements). Iterate over a copy `for item in lst[:]:`.

---

## 6. Strings, Slicing & String Interning
- **Slicing Syntax**: `sequence[start : stop : step]`
  - `start`: inclusive (default `0`)
  - `stop`: exclusive (default `len`)
  - `step`: step size (default `1`, negative step reverses direction)

```python
s = "Python Full Stack"
print(s[:6])     # "Python"
print(s[7:11])   # "Full"
print(s[-5:])    # "Stack"
print(s[::-1])   # "kcatS lluF nohtyP" (Reverse string)

# Essential String Methods:
s = "  hello world  "
print(s.strip())             # "hello world" (removes outer spaces)
print(s.replace("world", "Python")) # "  hello Python  "
print(s.split())             # ['hello', 'world'] (converts str to list)
print(" - ".join(["A", "B"])) # "A - B" (joins iterable into str)
```

- **String Interning**: CPython automatically caches immutable strings (identifiers, ASCII without spaces) so identical strings share the same RAM address, making `is` comparisons as fast as integer pointer checks.

---

## 7. Built-in Collections: List, Tuple, Set, Dictionary

| Collection | Ordered? | Mutable? | Duplicates? | Syntax | Key Use Case & Complexity |
|---|---|---|---|---|---|
| **List** | Yes | Yes | Yes | `[1, 2, 3]` | Dynamic sequences, arrays (O(1) append, O(N) search/insert) |
| **Tuple** | Yes | **No** | Yes | `(1, 2, 3)` | Fixed records, DB rows, dict keys (O(1) index lookup) |
| **Set** | No | Yes | **No** | `{1, 2, 3}` | Unique elements, membership check (O(1) lookup via hashing) |
| **Dictionary** | Yes (3.7+) | Yes | Keys Unique | `{"a": 1}` | Key-Value mappings, JSON models (O(1) average lookup) |

```python
# LIST
nums = [10, 20, 30]
nums.append(40)       # [10, 20, 30, 40]
nums.insert(1, 15)    # [10, 15, 20, 30, 40]
nums.extend([50, 60]) # [10, 15, 20, 30, 40, 50, 60]

# List removals:
nums.remove(15)       # Removes first occurrence of value 15 (ValueError if missing)
val = nums.pop()      # Removes and returns last item (or at index nums.pop(0))
del nums[0]           # Statement that deletes index 0 without returning

# TUPLE (Packing & Unpacking)
coords = (12.97, 77.59)
lat, lon = coords     # Unpacking

# SET (Math set operations - O(1) Lookups)
skills_user = {"Python", "Flask", "SQL"}
skills_job = {"Python", "Docker", "Kubernetes"}
print(skills_user & skills_job)  # Intersection: {'Python'}
print(skills_job - skills_user)  # Difference: {'Docker', 'Kubernetes'}

# DICTIONARY (Hash Table implementation)
user = {"id": 101, "name": "Vardhman"}
print(user.get("email", "Not Found"))  # Safe lookup without raising KeyError!
```

> **Viva Point**: Why can't a `list` be a dictionary key?
> Dictionary keys must be **hashable** (have a constant hash value throughout lifetime). Since lists are mutable, their hash cannot be guaranteed, raising `TypeError: unhashable type: 'list'`. Tuples can be keys if all their inner items are immutable.

---

## 8. Functions, `*args`, `**kwargs` & Scope (LEGB)

```python
# *args (packs positional arguments into tuple)
# **kwargs (packs keyword arguments into dict)
def build_api_response(status, *messages, **meta):
    return {
        "status": status,
        "messages": list(messages),
        "metadata": meta
    }

resp = build_api_response(200, "Success", "Cached", page=1, per_page=20)
```

### The Mutable Default Argument Trap:
```python
# WRONG (Evaluated ONCE when function is defined! Persists across calls)
def add_to_cart(item, cart=[]):
    cart.append(item)
    return cart

# CORRECT (Use None as sentinel)
def add_to_cart(item, cart=None):
    if cart is None:
        cart = []
    cart.append(item)
    return cart
```

### LEGB Scope Resolution Order:
1. **L**ocal (inside active function)
2. **E**nclosing (outer enclosing/nested functions, closures)
3. **G**lobal (module-level `.py` file)
4. **B**uilt-in (`len`, `range`, `print`, `ValueError`)

---

## 9. Comprehensions & Lambda Functions
- **Syntax**: `[expression for item in iterable if condition]`
- **Why Comprehensions over `map()` + `filter()`?**: Avoids Python function-call overhead on every iteration and is more readable.

```python
# List Comprehension
nums = [1, 2, 3, 4, 5, 6]
squares_even = [n**2 for n in nums if n % 2 == 0]  # [4, 16, 36]

# Dict Comprehension
scores = {"alice": 85, "bob": 42, "charlie": 95}
passed = {name.title(): score for name, score in scores.items() if score >= 50}

# Lambda (Anonymous inline function)
square = lambda x: x * x
add = lambda x, y: x + y

# Sorting with Lambda key
products = [{"name": "Mouse", "price": 25}, {"name": "Laptop", "price": 1200}]
products.sort(key=lambda p: p["price"])
```

---

## 10. Exception Handling (`try-except-else-finally`)
- `try`: Code that might raise an exception.
- `except SpecificError as e`: Handles only that error (Never use bare `except:` as it catches `KeyboardInterrupt` and `SystemExit`).
- `else`: Runs **ONLY if NO exceptions occurred** in `try`.
- `finally`: Runs **ALWAYS** (used for cleanup, closing connections/file locks).

```python
def safe_divide(num, den):
    try:
        result = float(num) / float(den)
    except ZeroDivisionError:
        return "Cannot divide by zero!"
    except ValueError as e:
        return f"Invalid number input: {e}"
    else:
        return f"Result: {result}"
    finally:
        print("Cleanup / Log completed")
```

> **Viva Gotcha**: If both `try` and `finally` have a `return` statement, the `return` in `finally` **always wins** and overrides the `try` return.

---

## 11. File Handling & Context Managers (`with`)
- **Modes**:
  - `'r'`: Read (raises `FileNotFoundError` if missing)
  - `'w'`: Write (overwrites file or creates new)
  - `'a'`: Append (adds data to end of file)
  - `'r+'`: Read and Write
- **Why `with open(...)`?**: Implements Context Management protocol (`__enter__` and `__exit__`), guaranteeing file descriptor is closed automatically even if an exception crashes the block.

```python
# Memory-efficient line-by-line reading (Streaming large files)
with open("data.txt", "r", encoding="utf-8") as f:
    for line in f:
        print(line.strip())
```

---

## 12. Important Comparisons

### 1. `==` vs `is`
- `==` (**Value Equality**): Calls `__eq__()` to check if contents match.
- `is` (**Identity Check**): Checks if both variables point to the exact same memory address (`id(a) == id(b)`).
- `is None` is faster than `== None` (direct bytecode pointer check, cannot be overridden by `__eq__`).

```python
list1 = [1, 2, 3]
list2 = [1, 2, 3]
list3 = list1

print(list1 == list2)  # True (same values)
print(list1 is list2)  # False (different objects in RAM)
print(list1 is list3)  # True (same reference)

# Small Integer Caching (-5 to 256 pre-allocated by Python)
a = 256
b = 256
print(a is b)          # True (Interned small integer)
```

### 2. `list` vs `tuple`
- **Memory**: Tuples allocate exact memory; Lists over-allocate memory to allow O(1) amortized appends.
- **Speed**: Tuples iterate and instantiate faster than lists.
- **Design Intent**: Tuples represent fixed heterogeneous records (e.g. `(lat, lon, city)`); Lists represent homogeneous dynamic sequences (e.g. `[user1, user2, user3]`).

### 3. Shallow Copy vs Deep Copy
- **Assignment (`b = a`)**: Copies reference only. Mutating `b` mutates `a`.
- **Shallow Copy (`copy.copy(a)` or `a.copy()`)**: New outer container created, but nested elements still share references.
- **Deep Copy (`copy.deepcopy(a)`)**: Recursively duplicates the outer container AND all nested inner objects.

```python
import copy
original = [[1, 2], ["a", "b"]]
shallow = copy.copy(original)
deep = copy.deepcopy(original)

original[0].append(99)
print(shallow)  # [[1, 2, 99], ['a', 'b']] -> Nested list modified!
print(deep)     # [[1, 2], ['a', 'b']]     -> Untouched!
```

### 4. Memory Management & Garbage Collection
- **Reference Counting**: Primary GC. Each object tracks how many variables point to it. When count hits `0`, memory is freed immediately.
- **Cyclic Garbage Collector**: Background generational collector that detects and clears circular references (e.g. `A -> B -> A`).

### 5. GIL (Global Interpreter Lock)
- A mutex lock in CPython ensuring only **one native thread executes Python bytecode at a time**.
- **I/O-bound tasks** (network requests, DB queries, reading files): Multi-threading or AsyncIO works great because the GIL is released during I/O wait.
- **CPU-bound tasks** (heavy math, data processing, encryption): Use **`multiprocessing`** (separate processes with separate GILs on multiple CPU cores) instead of multi-threading.

### 6. Quick Method Differences
- **`append(x)` vs `extend(iter)`**: `append` adds `x` as a single element; `extend` iterates over `iter` and adds each item individually.
- **`sort()` vs `sorted()`**: `list.sort()` sorts in-place and returns `None`; `sorted(iterable)` returns a brand new sorted list.
- **`dict[k]` vs `dict.get(k)`**: `dict[k]` raises `KeyError` if key missing; `dict.get(k, default)` safely returns `None` or custom default.
- **`break` vs `continue` vs `pass`**: `break` exits loop immediately; `continue` skips to next iteration; `pass` is a null statement placeholder (no-op).
- **`range()`**: In Python 3, returns an immutable lazy generator-like sequence object evaluated in O(1) memory, not a physical list.
- **PEP 8**: Official Python Style Guide (4 spaces per indent, `snake_case` for functions/variables, `CamelCase` for classes).
